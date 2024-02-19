import { AddBookCard } from "./AddBookCard";
import { getAuthors } from "./actions";
import BooksContainer from "./BooksContainer";
import Books from "./Books";

export default async function AuthorsPage() {
  const authors = await getAuthors();
  return (
    <div className="flex w-full flex-row items-start justify-between space-x-10 overflow-scroll px-8 py-4">
      <BooksContainer>
        <Books />
      </BooksContainer>
      <AddBookCard authors={authors} />
    </div>
  );
}
