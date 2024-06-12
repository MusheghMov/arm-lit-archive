import { getBook, getBooksByUserLikedBooks, getDbUser } from "./actions";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";

const BookContent = dynamic(() => import("@/components/BookContent"), {
  ssr: false,
});

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  let booksUserLiked;
  let bookIds;
  let isLiked = false;
  let book;
  let dbUser;
  const bookId = +params.bookId;

  if (bookId) {
    book = await getBook(+params.bookId);
    const { userId } = auth();
    dbUser = await getDbUser(userId!);
    if (dbUser) {
      booksUserLiked = await getBooksByUserLikedBooks({
        userId: dbUser?.id!,
      });
      bookIds = book ? booksUserLiked?.map((book) => book.bookId) : [];
      isLiked = bookIds?.includes(+params.bookId);
    }
  }

  if (!book) {
    return (
      <div className="absolute flex h-full w-full flex-col items-center justify-center space-y-4 p-2 text-center">
        <h1 className="text-4xl font-bold">Book not found</h1>
        <p className="text-lg">The book you are looking for does not exist.</p>
      </div>
    );
  }

  return <BookContent book={book} isLiked={isLiked} dbUser={dbUser} />;
}
