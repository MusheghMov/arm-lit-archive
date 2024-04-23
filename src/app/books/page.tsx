import Books from "./Books";
import { getBooksByUserLikedBooks, getDbUser } from "./actions";
import { auth } from "@clerk/nextjs/server";

export default async function BooksPage() {
  let booksUserLiked;
  let likedBooks;
  const { userId } = auth();
  const dbUser = await getDbUser(userId!);
  if (dbUser) {
    booksUserLiked = await getBooksByUserLikedBooks({
      userId: dbUser.id,
    });
    likedBooks = booksUserLiked?.map((book) => book.bookId);
  }

  return (
    <div className="flex w-full flex-row items-start justify-between space-x-10 px-8 py-4">
      <Books likedBooks={likedBooks} dbUserId={dbUser?.id!} />
    </div>
  );
}
