import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Searcher from "@/components/Search";

const Page = () => {
  return (
    <MaxWidthWrapper>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-6">Buscar seu imóvel</h1>
      
      <div className="pb-6">
      <Searcher />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
