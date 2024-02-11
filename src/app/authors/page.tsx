import { getAuthors } from "./actions";
import { AddAuthorCard } from "./addAuthorCard";
import AuthorCard from "@/components/AuthorCard";

export default async function AuthorsPage() {
  const authors = await getAuthors();
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex flex-row flex-wrap gap-6">
        {authors?.map((author) => (
          <AuthorCard
            key={author.id}
            name={author.name!}
            birthYear={author.birthDate!}
            deathYear={author.deathDate!}
            bio={author.bio!}
          />
        ))}
      </div>
      <AddAuthorCard />
    </div>
  );
}
