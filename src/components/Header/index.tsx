"use client";
import { Menu } from "lucide-react";
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
        <svg
          className="fill-black dark:fill-white"
          height="20px"
          width="20px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 490.00 490.00"
          stroke="#ffffff"
          strokeWidth="0.0049"
          transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#e60000"
            strokeWidth="8.82"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <g>
                  <path d="M56.3,386.7H377c4.3-11.6,10.5-22.9,19-32.6H62.1c-34.2,0-61.7,30.3-61.7,67.9s27.6,68,61.7,68H396 c-8.5-9.7-14.8-20.6-19-32.6H56.3c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h316.1c-1.6-10.5-1.6-21,0-31.1H56.3 c-5.4,0-10.1-4.3-10.1-10.1C46.2,391,50.9,386.7,56.3,386.7z"></path>{" "}
                  <path d="M427.9,177.4H94c8.5,9.7,14.8,20.6,19,32.6h318c5.4,0,10.1,4.3,10.1,10.1c0,5.4-4.3,10.1-10.1,10.1H117.6 c1.6,10.5,1.6,21,0,31.1H431c5.4,0,10.1,4.3,10.1,10.1c0,5.4-4.3,10.1-10.1,10.1H113c-4.3,11.6-10.5,22.9-19,32.6h333.9 c34.2,0,61.7-30.3,61.7-67.9S462,177.4,427.9,177.4z"></path>{" "}
                  <path d="M62.1,136.7H396c-8.5-9.7-14.8-20.6-19-32.6H61.3c-5.4,0-10.1-4.3-10.1-10.1s4.3-10.1,10.1-10.1h311 c-1.6-10.5-1.6-21,0-31.1h-311c-5.4,0-10.1-4.3-10.1-10.1s4.3-10.1,10.1-10.1H377C381.3,21,387.5,9.7,396,0H62.1 C28,0.8,0.4,31.1,0.4,68.7S28,136.7,62.1,136.7z"></path>{" "}
                </g>
              </g>
            </g>
          </g>
        </svg>
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
        <ModeToggle />
      </div>
    </div>
  );
}
