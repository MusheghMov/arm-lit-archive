import BookCard from "@/components/BookCard";
import { AddBookCard } from "./AddBookCard";
import { getAuthors, getBooks } from "./actions";

export default async function AuthorsPage() {
  const authors = await getAuthors();
  const books = await getBooks();
  return (
    <div className="flex w-full flex-row items-start justify-between space-x-10 overflow-scroll px-8 py-4">
      <div className="flex flex-row flex-wrap gap-6">
        {books?.map((book) => <BookCard key={book?.id} book={book} />)}
      </div>
      <AddBookCard authors={authors} />
    </div>
  );
}
