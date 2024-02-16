import { getAuthors } from "./actions";
import { AddAuthorCard } from "./addAuthorCard";
import AuthorCard from "@/components/AuthorCard";

export default async function AuthorsPage() {
  const authors = await getAuthors();
  return (
    <div className="flex w-full flex-row items-start justify-between space-x-10 overflow-scroll px-8 py-4">
      <div className="flex flex-row flex-wrap gap-6">
        {authors?.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
      <AddAuthorCard />
    </div>
  );
}
