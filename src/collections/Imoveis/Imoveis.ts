import { PROPERTY_CATEGORIES, PROPERTY_STATUS } from "../../config";
import { CollectionConfig } from "payload/types";

export const Imoveis: CollectionConfig = {
    slug: "imoveis",
    admin: {
        useAsTitle: "title"
    },
    access: {},
    fields: [
        {
            name: "cep",
            label: "CEP",
            type: "text",
            required: true,
        },
        {
            name: "title",
            label: "Título",
            type: "text",
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Detalhes do imóvel',
        },
        {
            name: 'price',
            label: 'Preço em R$',
            min: 0,
            max: 100000000,
            type: 'number',
            required: true,
        },
        {
            name: 'category',
            label: 'Categoria',
            type: 'select',
            options: PROPERTY_CATEGORIES.map(
                ({ label, value }) => ({ label, value })
            ),
            required: true,
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: PROPERTY_STATUS.map(
                ({ label, value }) => ({ label, value })
            ),
            required: true,
        },
        {
            name: 'images',
            type: 'array',
            label: 'Imagens do imóvel',
            minRows: 1,
            maxRows: 20,
            required: true,
            labels: {
                singular: 'Imagem',
                plural: 'Imagens'
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                }
            ]
        },
        {
            name: 'bedrooms',
            label: 'Quartos',
            min: 0,
            max: 100000000,
            type: 'number',
            required: true,
        },
        {
            name: 'bathrooms',
            label: 'Banheiros',
            min: 0,
            max: 100000000,
            type: 'number',
            required: true,
        },
    ]
}