"use client";
import { LibraryBig, Menu } from "lucide-react";
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
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(pathname.split("/")[1]);
  return (
    <div className="sticky top-0 z-50 flex flex-row items-center justify-between bg-background px-4 py-4 lg:px-8">
      <Link href="/" className="flex flex-row items-center space-x-2">
        <LibraryBig className="min-h-6 min-w-6" />
        <h2 className="hidden text-base font-bold sm:block">
          Armenian Literature Archive
        </h2>
      </Link>

      <div className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] flex-row items-center space-x-10 lg:flex">
        <Link
          href="/"
          prefetch
          className={cn(
            "border-b-foreground text-black hover:border-b dark:text-white",
            selected === "" && "border-b"
          )}
          onClick={() => setSelected("")}
        >
          Home
        </Link>
        <Link
          href="/authors"
          prefetch
          className={cn(
            "border-b-foreground text-black hover:border-b dark:text-white",
            selected === "authors" && "border-b"
          )}
          onClick={() => setSelected("authors")}
        >
          Authors
        </Link>
        <Link
          href="/books"
          className={cn(
            "border-b-foreground text-black hover:border-b dark:text-white",
            selected === "books" && "border-b"
          )}
          onClick={() => setSelected("books")}
        >
          Books
        </Link>
      </div>

      <div className="flex flex-row items-center space-x-4 lg:flex">
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
        {/* <form> */}
        {/*   <Input placeholder="Search" className="hidden h-full sm:block" /> */}
        {/* </form> */}

        <ModeToggle />
        {/* <Avatar className="h-8 w-8"> */}
        {/*   <AvatarImage src="https://github.com/shadcn.png" /> */}
        {/*   <AvatarFallback>CN</AvatarFallback> */}
        {/* </Avatar> */}
      </div>
    </div>
  );
}
