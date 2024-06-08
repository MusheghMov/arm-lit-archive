import { getBook, getBooksByUserLikedBooks, getDbUser } from "./actions";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";

const BookContent = dynamic(() => import("@/components/BookContent"), { ssr: false });

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


  if (!book) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">Book not found</h1>
        <p className="text-lg">The book you are looking for does not exist.</p>
      </div>
    );
  }

  return <BookContent book={book} isLiked={isLiked} dbUser={dbUser} />;
}
