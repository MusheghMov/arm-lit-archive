"use client";

import { FileText } from "lucide-react";
import FavoriteButton from "../FavoriteButton";
import Link from "next/link";
import { useAtom } from "jotai";
import { fontSize as storeFontSize } from "@/providers/JotaiProvider";
import { Progress } from "../ui/progress";
import PageButtons from "../PageButtons";
const chunkSize = 4000;

export default function BookContent({
  book,
  pageNumber,
}: {
  book: any;
  pageNumber: number;
}) {
  const [fontSize] = useAtom(storeFontSize);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex h-full w-full flex-col items-center gap-y-10 bg-background px-4 md:px-8 lg:max-w-[80%] lg:p-0">
        <div className="flex w-full flex-col-reverse lg:flex-row">
          <div className="flex w-full flex-col items-center space-y-2 px-8">
            <div className="flex flex-row space-x-4">
              <p className="text-center text-3xl font-bold">{book?.title}</p>
              <FavoriteButton
                isLiked={book?.userLikedBooks?.length > 0}
                bookId={book.id}
              />
            </div>
            <p className="text-center text-slate-500">{book?.titleTranslit}</p>
            <div className="flex flex-row space-x-1 text-slate-500">
              <Link
                href={`/authors/${book.authorId}`}
                className="hover:underline"
              >
                {book?.authorName}
              </Link>
              <p>{book?.year! > 0 && `| ${book?.year}`}</p>
            </div>
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

        <article
          style={{
            fontSize: `${fontSize}px`,
          }}
          className="prose flex w-full min-w-full flex-col items-center justify-center gap-0 whitespace-pre-wrap text-foreground/80 dark:prose-invert lg:prose-xl lg:px-24"
        >
          {book.textLength > chunkSize ? (
            <PageButtons
              pagesCount={Math.ceil(book?.textLength / chunkSize)}
              pageNumber={pageNumber}
              bookId={book.id}
            />
          ) : null}
          {book.text}
        </article>
      </div>

      {book?.userReadingProgress[0]?.lastPageNumber ? (
        <Progress
          className="sticky bottom-0 h-1 rounded-[0]"
          value={
            (book.userReadingProgress[0].lastPageNumber / book.bookPagesCount) *
            100
          }
        />
      ) : null}
    </div>
  );
}
