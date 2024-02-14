import { getAuthors } from "./actions";
import { AddAuthorCard } from "./addAuthorCard";
import AuthorCard from "@/components/AuthorCard";

export default async function AuthorsPage() {
  const authors = await getAuthors();
  return (
    <div className="flex h-full w-full flex-row justify-between">
      <div className="flex flex-row flex-wrap gap-6">
        {authors?.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
      <AddAuthorCard />
    </div>
  );
}
