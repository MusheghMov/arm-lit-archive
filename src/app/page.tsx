import Hero from "@/components/Hero";
import RecommendationSection from "@/components/RecommendationSection";
import { auth } from "@clerk/nextjs/server";
import { getBooks } from "@/actions";

export default async function Home() {
  const { userId } = await auth();
  const recentlyAddedBooks = await getBooks({
    limit: 10,
    chunkSize: 4000,
    userId: userId!,
  });
  const booksByAuthor = await getBooks({
    authorId: 37,
    limit: 10,
    userId: userId!,
    chunkSize: 4000,
  });

  return (
    <div className="relative flex h-max w-full flex-col">
      <Hero />
      <div className="flex w-full flex-col space-y-10 px-4 py-10 lg:px-10">
        <RecommendationSection
          books={recentlyAddedBooks}
          title="recently added books"
          href="/books"
        />
        <RecommendationSection
          books={booksByAuthor}
          title={`books by ${booksByAuthor[0]?.authorName}`}
          href={`/authors/${booksByAuthor[0]?.authorId}`}
        />
      </div>
    </div>
  );
}
