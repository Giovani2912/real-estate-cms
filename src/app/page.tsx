import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check } from "lucide-react";
import PropertyReel from "@/components/PropertyReel";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-center flex-col gap-8">
        <span className="my-6 font-bold text-4xl lg:text-6xl">
          Encontre o seu lugar
        </span>

        <span className="my-6 font-bold text-4xl flex flex-col md:flex-row gap-2 items-center lg:text-6xl">
          Destaques em{" "}
          <span className="bg-blue-600 text-white p-2 rounded-lg">
            Indaiatuba
          </span>
        </span>

        <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-4 md:space-y-2 w-fit">
          <li className="w-fit">
            <Check className="h-5 w-5 text-blue-600 inline mr-1.5" />
            Mais de 33 anos dedicado aos cidadãos de Indaiatuba.
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-blue-600 inline mr-1.5" />
            Mais de 700 imóveis na plataforma.
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-blue-600 inline mr-1.5" />
            Comunicação rápida e eficaz.
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-blue-600 inline mr-1.5" />
            Localizada no coração da cidade.
          </li>
        </ul>
      </div>

      <PropertyReel title="Destaques" query={{ sort: "desc", limit: 4 }} />

    </MaxWidthWrapper>
  );
}
