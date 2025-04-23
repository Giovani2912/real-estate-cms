import Link from "next/link";
import { buttonVariants } from "./ui/button";
import MenuSidebar from "./MenuSidebar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Navbar = async () => {

  const status = [
    {
      title: "Lançamentos",
      href: "/lancamentos",
    },
    {
      title: "Prontos para morar",
      href: "/prontos",
    },
    {
      title: "Imóvel na planta",
      href: "/imovel-planta",
    },
  ]

  const categories = [
    {
      title: "Apartamentos",
      href: "/apartamentos",
    },
    {
      title: "Casas",
      href: "/casas",
    },
    {
      title: "Casas em condomínio",
      href: "/casas-condominio",
    },
    {
      title: "Terenos",
      href: "/terrenos",
    },
    {
      title: "Duplex",
      href: "/duplex",
    },
    {
      title: "Studios",
      href: "/studios",
    },
    {
      title: "Chácaras",
      href: "/chacaras",
    },
  ]

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
            <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                          <NavigationMenuTrigger>Status</NavigationMenuTrigger>
                          <NavigationMenuContent>
                          <ul className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px] ">
                              {status.map((statu) => (
                                <NavigationMenuLink key={statu.title}>
                                  <Link
                                    href={statu.href}
                                    className={buttonVariants({ variant: "ghost" })}
                                  >
                                    {statu.title}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                  </NavigationMenuList>
              </NavigationMenu>
              <span className="h-6 w-px mx-2 bg-gray-200" />

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                          <NavigationMenuTrigger>Categorias de imóveis</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px] ">
                              {categories.map((category) => (
                                <NavigationMenuLink key={category.title}>
                                  <Link
                                    href={category.href}
                                    className={buttonVariants({ variant: "ghost" })}
                                  >
                                    {category.title}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                  </NavigationMenuList>
              </NavigationMenu>

              <span className="h-6 w-px mx-2 bg-gray-200" />
              <Link
                href="/locacao"
                className={buttonVariants({ variant: "ghost" })}
              >
                Locação
              </Link>

              <span className="h-6 w-px mx-2 bg-gray-200" />
              <Link
                href="/buscar"
                className={buttonVariants({ variant: "ghost" })}
              >
                Buscar um imóvel
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
