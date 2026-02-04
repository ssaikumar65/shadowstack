"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const { back } = useRouter();
  return (
    <header className=" fixed flex top-0 z-999 w-full bg-transparent px-4 py-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex w-full items-center justify-between overflow-hidden h-16 rounded-xl border border-muted-foreground/50 bg-transparent px-8 py-3 ">
        <span className="font-bold text-xl">Shadow Stack</span>
        {pathname !== "/" ? (
          <Button
            className="cursor-pointer"
            size={"icon"}
            onClick={back}
            variant={"outline"}
          >
            <Home />
          </Button>
        ) : null}
      </div>
    </header>
  );
};
export default Header;
