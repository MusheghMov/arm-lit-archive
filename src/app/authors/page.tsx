import { getAuthors } from "./actions";
import AuthorCard from "@/components/AuthorCard";

export default async function AuthorsPage() {
  const authors = await getAuthors({ search: "" });
  return (
    <div className="flex h-[100dvh] w-full flex-row items-start justify-between space-x-10 overflow-scroll px-8 py-4">
      <div className="flex flex-row flex-wrap justify-around gap-6 md:justify-start">
        {authors?.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
}
