import { Textarea } from "@/components/ui/textarea";
import { getAuthors } from "./actions";
import { AddAuthorCard } from "./addAuthorCard";
import BookCard from "@/components/BookCard";

export default async function AuthorsPage() {
  const authors = await getAuthors();
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex flex-row">
        {authors?.map((author) => (
          <div key={author.id}>
            <BookCard
              name={author.name!}
              bio={author.bio!}
              birthYear={author.birthDate!}
              deathYear={author.deathDate!}
            />
          </div>
        ))}
      </div>
      <AddAuthorCard />
    </div>
  );
}
