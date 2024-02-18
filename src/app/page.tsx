import Hero from "@/components/Hero";
import { getBooks, getBooksByAuthor } from "./books/actions";
import RecommendationSection from "@/components/RecommendationSection";

export default async function Home() {
  const recentlyAddedBooks = await getBooks({ limit: 10 });
  const booksByAuthor = await getBooksByAuthor({ authorId: 37, limit: 10 });
  return (
    <div className="flex h-[100dvh] w-full flex-col space-y-40 overflow-scroll py-6">
      <Hero />
      <div className="flex w-full flex-col space-y-10 px-10">
        <RecommendationSection
          books={recentlyAddedBooks}
          title="recently added books"
          href="/books"
        />
        <RecommendationSection
          books={booksByAuthor}
          title={`books by ${booksByAuthor[0]?.author?.name}`}
          href={`/authors/${booksByAuthor[0]?.author?.id}`}
        />
      </div>
    </div>
  );
}
