import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import MenuSidebar from "./MenuSidebar";

const Navbar = async () => {
  const nextCookies = cookies();

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 lg:mx-6">
      <header className="relative bg-white">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            {/* TODO: Mobile nav */}

            <div className="ml-4 flex lg:ml-0">
              <div className="flex items-center justify-between w-full">
                <Link href="/">
                  {/* <Image
                    src="https://bucket-company.s3.amazonaws.com/logo/374.png"
                    height={150}
                    width={150}
                    alt="logo"
                  /> */}
                </Link>
                <div className="flex absolute lg:hidden right-4">
                  <MenuSidebar />
                </div>
              </div>
            </div>

            <div className="hidden z-50 lg:ml-8 lg:flex lg:items-center">
              <Link
                href="/lancamentos"
                className={buttonVariants({ variant: "ghost" })}
              >
                Lançamentos
              </Link>
              <span className="h-6 w-px mx-2 bg-gray-200" />
              <Link
                href="/prontos-para-morar"
                className={buttonVariants({ variant: "ghost" })}
              >
                Prontos para morar
              </Link>
              <span className="h-6 w-px mx-2 bg-gray-200" />
              <Link
                href="/locacao"
                className={buttonVariants({ variant: "ghost" })}
              >
                Locação
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  href="/fale-conosco"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Fale conosco
                </Link>

                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                <Link
                  href="/anuncie-seu-imovel"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Anuncie seu imóvel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
