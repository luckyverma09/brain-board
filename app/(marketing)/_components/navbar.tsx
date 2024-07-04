"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 w-full p-6 flex items-center",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="ml-auto flex items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
