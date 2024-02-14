"use client";
import { LibraryBig, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(pathname.split("/")[1]);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-2">
        <LibraryBig className="min-h-6 min-w-6" />
        <h2 className="hidden text-base font-bold sm:block">
          Armenian Literature Archive
        </h2>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="lg:hidden">
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push("/")}>
            Home
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/authors")}>
            Authors
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/books")}>
            Books
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden flex-row items-center space-x-4 lg:flex">
        <Button
          variant="link"
          className={cn(
            "text-black dark:text-white",
            selected === "" && "underline"
          )}
          onClick={() => {
            setSelected("");
            router.push("/");
          }}
        >
          Home
        </Button>
        <Button
          variant="link"
          className={cn(
            "text-black dark:text-white",
            selected === "authors" && "underline"
          )}
          onClick={() => {
            setSelected("authors");
            router.push("/authors");
          }}
        >
          Authors
        </Button>
        <Button
          variant="link"
          className={cn(
            "text-black dark:text-white",
            selected === "books" && "underline"
          )}
          onClick={() => {
            setSelected("books");
            router.push("/books");
          }}
        >
          Books
        </Button>
        <Button disabled variant="link" className="text-black dark:text-white">
          Categories
        </Button>
      </div>

      <div className="hidden flex-row items-center space-x-4 lg:flex">
        <form>
          <Input placeholder="Search" className="hidden h-full sm:block" />
        </form>

        <ModeToggle />
        {/* <Avatar className="h-8 w-8"> */}
        {/*   <AvatarImage src="https://github.com/shadcn.png" /> */}
        {/*   <AvatarFallback>CN</AvatarFallback> */}
        {/* </Avatar> */}
      </div>
    </div>
  );
}
