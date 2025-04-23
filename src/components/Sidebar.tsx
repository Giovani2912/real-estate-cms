"use client";
import { Button } from "./ui/button";
import {
  BookCheck,
  Calendar,
  CheckCheck,
  HomeIcon,
  Phone,
} from "lucide-react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import Link from "next/link";

const Sidebar = () => {
  return (
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-between gap-3 border-b border-solid py-5"></div>
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <Button className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Lançamentos
            </Link>
          </Button>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/prontos-para-morar">
              <CheckCheck size={18} />
              Prontos para morar
            </Link>
          </Button>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/locacao">
              <Calendar size={18} />
              Locação
            </Link>
          </Button>
          <div className="flex flex-col gap-2 border-b border-solid"></div>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/fale-conosco">
              <Phone size={18} />
              Fale conosco
            </Link>
          </Button>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/anuncie-seu-imovel">
              <BookCheck size={18} />
              Anuncie seu imóvel
            </Link>
          </Button>
        </div>
      </SheetContent>
  );
};

export default Sidebar;
