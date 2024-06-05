import { getBook, getBooksByUserLikedBooks, getDbUser } from "./actions";
import { FileText } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import FavoriteButton from "@/components/FavoriteButton";

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  let booksUserLiked;
  let bookIds;
  let isLiked = false;
  const book = await getBook(+params.bookId);
  const { userId } = auth();
  const dbUser = await getDbUser(userId!);
  if (dbUser) {
    booksUserLiked = await getBooksByUserLikedBooks({
      userId: dbUser?.id!,
    });
    bookIds = booksUserLiked?.map((book) => book.bookId);
    isLiked = bookIds?.includes(+params.bookId);
  }

  return (
    <div className="flex w-full flex-col items-center space-y-10 overflow-scroll bg-background py-10 lg:pt-8">
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
        <article className="prose flex w-full min-w-full items-center justify-center whitespace-pre-wrap px-5 text-foreground/80 lg:prose-xl lg:px-24">
          {book?.text}
        </article>
      </pre>
    </div>
  );
}
