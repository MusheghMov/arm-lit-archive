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
    <div className="flex w-full flex-col">
      {book?.userReadingProgress[0]?.lastPageNumber ? (
        <Progress
          className="sticky top-[57px] h-1 rounded-[0]"
          value={
            (book.userReadingProgress[0].lastPageNumber / book.bookPagesCount) *
            100
          }
        />
      ) : null}
      <div className="flex w-full flex-col items-center gap-y-10 bg-background py-10 lg:pt-8">
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

        <pre className="w-full bg-transparent">
          <article
            style={{
              fontSize: `${fontSize}px`,
            }}
            className="prose flex w-full min-w-full flex-col items-center justify-center gap-10 whitespace-pre-wrap px-5 text-foreground/80 lg:prose-xl lg:px-24"
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
        </pre>
      </div>
    </div>
  );
}
