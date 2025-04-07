import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PropertyReel from "@/components/PropertyReel";
import { PROPERTY_STATUS } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    status: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { status } = params;

  const payload = await getPayloadClient();

  const { docs: imoveis } = await payload.find({
    collection: "imoveis",
    limit: 1,
    where: {
      status: {
        equals: status,
      },
    },
  });

  const [property] = imoveis;

  if (!property) return notFound();

  const label = PROPERTY_STATUS.find(
    ({ value }) => value === property.status
  )?.label;

  return (
    <MaxWidthWrapper>
      <h2>Prontos para morar</h2>
      <PropertyReel
        href={`/imoveis/${property.category}`}
        query={{ status: property.status, limit: 4 }}
        title={`Semelhantes a ${label}`}
        subtitle={`Veja outras opções de ${label} parecidas com '${property.title}'`}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
