/* eslint-disable react/no-unescaped-entities */
import BookCard from "@/components/BookCard";
import db from "@/db";
import { getBooksByUserLikedBooks } from "./actions";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = auth();
  const dbUser = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.sub, userId!),
  });

  const books = await getBooksByUserLikedBooks({ userId: dbUser?.id! });
  const likedBooks = books?.map((book) => book.bookId);

  return (
    <div className="flex w-full flex-col items-start justify-between space-y-10 px-8 py-10">
      <div>
        <p className="text-2xl font-bold capitalize"> my profile</p>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="font-bold capitalize">liked books</p>
        <div className="flex w-full flex-row flex-wrap gap-6">
          {books?.map((book) => (
            <BookCard
              key={book.book.id}
              book={book.book}
              dbUserId={dbUser?.id!}
              isLiked={likedBooks.includes(book.book.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
