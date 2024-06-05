import Hero from "@/components/Hero";
import {
  getBooks,
  getBooksByAuthor,
  getBooksByUserLikedBooks,
} from "./books/actions";
import RecommendationSection from "@/components/RecommendationSection";
import db from "@/db";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  let dbUser;
  let books;
  let likedBooks;

  const { userId } = auth();

  const recentlyAddedBooks = await getBooks({ limit: 10 });
  const booksByAuthor = await getBooksByAuthor({ authorId: 37, limit: 10 });

  dbUser = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.sub, userId!),
  });
  if (dbUser) {
    books = await getBooksByUserLikedBooks({ userId: dbUser.id });
    likedBooks = books?.map((book) => book.bookId);
  }

  return (
    <div className="relative flex h-max w-full flex-col">
      <Hero />
      <div className="flex w-full flex-col space-y-10 px-4 py-10 lg:px-10">
        <RecommendationSection
          books={recentlyAddedBooks}
          title="recently added books"
          href="/books"
          dbUserId={dbUser?.id!}
          likedBooks={likedBooks}
        />
        <RecommendationSection
          books={booksByAuthor}
          title={`books by ${booksByAuthor[0]?.author?.name}`}
          href={`/authors/${booksByAuthor[0]?.author?.id}`}
          dbUserId={dbUser?.id!}
          likedBooks={likedBooks}
        />
      </div>
    </div>
  );
}
