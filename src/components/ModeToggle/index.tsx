"use client";

import { Circle, Minus, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { fontSize as storeFontSize } from "@/providers/JotaiProvider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getNextBook, getPreviousBook } from "@/actions";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [fontSize, setFontSize] = useAtom(storeFontSize);
  const { bookId } = useParams<{ bookId: string }>();
  const router = useRouter();

  const { data: nextBook } = useQuery({
    queryKey: ["nextBook", bookId],
    queryFn: () => getNextBook(+bookId),
    enabled: !!bookId,
  });

  const { data: prevBook } = useQuery({
    queryKey: ["prevBook", bookId],
    queryFn: () => getPreviousBook(+bookId),
    enabled: !!bookId,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Circle className="fill-main stroke-border" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-3 bg-card p-3">
        <div className="flex flex-row items-center gap-1 bg-card">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("light")}
          >
            <Circle className="fill-white stroke-gray-300" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("slate")}
          >
            <Circle className="fill-slate-500 stroke-slate-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("green")}
          >
            <Circle className="fill-green-500 stroke-green-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("zink")}
          >
            <Circle className="fill-zinc-500 stroke-zinc-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("violet")}
          >
            <Circle className="fill-violet-500 stroke-violet-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => setTheme("blue")}
          >
            <Circle className="fill-blue-500 stroke-blue-500" />
          </Button>
        </div>
        {bookId ? (
          <>
            <div className="flex w-full flex-row items-center justify-between gap-2 px-1">
              <p className="w-full flex-1 font-semibold uppercase">
                Font Size:
              </p>
              <div className="flex flex-row items-center gap-2">
                <Button
                  className="h-min w-min rounded-full p-2"
                  onClick={() => {
                    setFontSize(fontSize - 1);
                  }}
                >
                  <Minus size={16} />
                </Button>
                <p>{fontSize}</p>
                <Button
                  className="h-min w-min rounded-full p-2"
                  onClick={() => {
                    setFontSize(fontSize + 1);
                  }}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-row justify-between gap-2">
              <Button
                className="w-full capitalize"
                onClick={() => {
                  router.push(`/books/${prevBook?.id}?page=1`);
                }}
                disabled={!prevBook}
              >
                previous book
              </Button>
              <Button
                className="w-full capitalize"
                onClick={() => {
                  router.push(`/books/${nextBook?.id}?page=1`);
                }}
                disabled={!nextBook}
              >
                next book
              </Button>
            </div>
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
