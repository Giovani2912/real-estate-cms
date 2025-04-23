import { z } from 'zod'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'

export const appRouter = router({
    // Rota para listar todos os imóveis
    getInfiniteProperties: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100),
                cursor: z.number().nullish(),
                query: QueryValidator,
            })
        )
        .query(async ({ input }) => {
            const { query, cursor } = input
            const { sort, limit, ...queryOpts } = query

            const payload = await getPayloadClient()

            const parsedQueryOpts: Record<
                string,
                { equals: string }
            > = {}

            Object.entries(queryOpts).forEach(([key, value]) => {
                parsedQueryOpts[key] = {
                    equals: value,
                }
            })

            const page = cursor || 1

            const {
                docs: items,
                hasNextPage,
                nextPage,
            } = await payload.find({
                collection: 'imoveis',
                where: {
                //     approvedForSale: {
                //         equals: 'approved',
                //     },
                ...parsedQueryOpts,
                },
                sort,
                depth: 1,
                limit,
                page,
            })

            return {
                items,
                nextPage: hasNextPage ? nextPage : null,
            }
        }),


        getFilteredProperties: publicProcedure
        .input(
            z.object({
            neighborhood: z.string().optional(),
            bathrooms: z.number().optional(),
            bedrooms: z.number().optional(),
            suites: z.number().optional(),
            parkcar: z.number().optional(),
            value: z.number().optional(),
            })
        )
        .query(async ({ input }) => {
            const payload = await getPayloadClient();

            const where: any = {};

            if (input.neighborhood) {
            where.neighborhood = { contains: input.neighborhood };
            }

            if (input.bathrooms !== undefined) {
            where.bathrooms = { greater_than_equal: input.bathrooms };
            }

            if (input.bedrooms !== undefined) {
            where.bedrooms = { greater_than_equal: input.bedrooms };
            }

            if (input.suites !== undefined) {
            where.suites = { greater_than_equal: input.suites };
            }

            if (input.parkcar !== undefined) {
            where.parkcar = { greater_than_equal: input.parkcar };
            }

            if (input.value !== undefined) {
            where.price = { less_than_equal: input.value };
            }

            const properties = await payload.find({
            collection: "imoveis",
            where,
            depth: 1,
            });

            return properties.docs;
        })

})

export type AppRouter = typeof appRouter