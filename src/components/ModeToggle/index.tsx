"use client";

import { Circle } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Circle className="fill-main stroke-border" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-row items-center gap-1 bg-card"
      >
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("light")}
          >
            <Circle className="fill-white stroke-gray-300" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("slate")}
          >
            <Circle className="fill-slate-500 stroke-slate-500" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="p-0">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("green")}
          >
            <Circle className="fill-green-500 stroke-green-500" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("zink")}
          >
            <Circle className="fill-zinc-500 stroke-zinc-500" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("violet")}
          >
            <Circle className="fill-violet-500 stroke-violet-500" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("blue")}
          >
            <Circle className="fill-blue-500 stroke-blue-500" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
