"use client";

import { TQueryValidator } from "@/lib/validators/query-validator";
import { Imovei } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import PropertyListing from "./PropertyListing";

interface PropertyReelProps {
  title?: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const PropertyReel = (props: PropertyReelProps) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProperties.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const properties = queryResults?.pages.flatMap((page) => page.items);

  let map: (Imovei | null)[] = [];
  if (properties && properties.length) {
    map = properties;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-red-600 hover:text-red-500 md:block"
          >
            Veja mais dessa categoria <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {map.map((property, i) => (
              <PropertyListing
                key={`property-${i}`}
                property={property}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyReel;
