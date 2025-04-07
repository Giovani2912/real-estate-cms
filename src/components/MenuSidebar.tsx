import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

const MenuSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <Sidebar />
    </Sheet>
  );
};

export default MenuSidebar;
