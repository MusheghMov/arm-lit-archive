"use client";

import { FileText } from "lucide-react";
import FavoriteButton from "../FavoriteButton";
import Link from "next/link";
import { useAtom } from "jotai";
import { fontSize as storeFontSize } from "@/providers/JotaiProvider";
import { useQuery } from "@tanstack/react-query";
import {
  getBookTextWithChunk,
  getUserBookProgress,
} from "@/app/books/[bookId]/actions";
import { useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import PageButtons from "../PageButtons";
const chunkSize = 4000;

export default function BookContent({
  book,
  isLiked,
  dbUser,
}: {
  book: any;
  isLiked: boolean;
  dbUser: any;
}) {
  const [fontSize] = useAtom(storeFontSize);
  const [chunkStart, setChunkStart] = useState(0);

  const { data: bookWithTextChunk, isFetched } = useQuery({
    queryKey: ["bookWithTextChunk", chunkStart],
    queryFn: () =>
      getBookTextWithChunk({
        bookId: book.id,
        chunkStart: chunkStart,
        chunkSize: chunkSize,
        userId: dbUser?.id,
      }),
    enabled: !!book.id,
  });

  const { data: userBookProgress } = useQuery({
    queryKey: ["userBookProgress", book.id, isFetched],
    queryFn: () => getUserBookProgress({ bookId: book.id, userId: dbUser?.id }),
    enabled: !!book.id && !!dbUser?.id,
  });

  return (
    <div className="flex w-full flex-col">
      {userBookProgress?.lastCharacterIndex ? (
        <Progress
          className="h-1 rounded-[0]"
          value={
            ((userBookProgress?.lastCharacterIndex - 1) / book.textLength) * 100
          }
        />
      ) : null}
      <div className="flex w-full flex-col items-center gap-y-10 bg-background py-10 lg:pt-8">
        <div className="flex w-full flex-col-reverse lg:flex-row">
          <div className="flex w-full flex-col items-center space-y-2 px-8">
            <div className="flex flex-row space-x-4">
              <p className="text-center text-3xl font-bold">{book?.title}</p>
              <FavoriteButton
                isLiked={isLiked}
                bookId={book.id}
                dbUserId={dbUser?.id}
              />
            </div>
            <p className="text-center text-slate-500">{book?.titleTranslit}</p>
            <div className="flex flex-row space-x-1 text-slate-500">
              <Link
                href={`/authors/${book.author?.id}`}
                className="hover:underline"
              >
                {book?.author?.name}
              </Link>
              <p>{book?.year! > 0 && `| ${book?.year}`}</p>
            </div>
            {dbUser?.id && (bookWithTextChunk?.text as string)?.length > 0 && (
              <Button
                variant="link"
                className=""
                onClick={() => {
                  if (userBookProgress?.lastCharacterIndex) {
                    setChunkStart(
                      userBookProgress?.lastCharacterIndex - chunkSize
                    );
                  }
                }}
              >
                continue reading
              </Button>
            )}
            {book?.sourceUrl && (
              <a
                target="_blank"
                href={book?.sourceUrl}
                className="text-slate-500"
              >
                <FileText />
              </a>
            )}
          </div>
        </div>

        {bookWithTextChunk ? (
          <pre className="w-full bg-transparent">
            <article
              style={{
                fontSize: `${fontSize}px`,
              }}
              className="prose flex w-full min-w-full flex-col items-center justify-center gap-10 whitespace-pre-wrap px-5 text-foreground/80 lg:prose-xl lg:px-24"
            >
              {book.textLength > chunkSize && (
                <PageButtons
                  onClickPrev={() => {
                    if (chunkStart - chunkSize < 0) {
                      setChunkStart(0);
                    } else {
                      setChunkStart((prev) => prev - chunkSize);
                    }
                  }}
                  onCLickNext={() => {
                    setChunkStart((prev) => prev + chunkSize);
                  }}
                  isPrevDisabled={chunkStart === 0}
                  isNextDisabled={
                    (bookWithTextChunk?.text as string)?.length + 1 < chunkSize
                  }
                />
              )}
              {bookWithTextChunk?.text}
            </article>
          </pre>
        ) : null}
      </div>
    </div>
  );
}
