import BookCard from "@/components/BookCard";
import { AddBookCard } from "./AddBookCard";
import { getAuthors, getBooks } from "./actions";

export default async function AuthorsPage() {
  const authors = await getAuthors();
  const books = await getBooks();
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex flex-row flex-wrap gap-6">
        {books?.map((book) => (
          <BookCard
            key={book?.id}
            title={book.title!}
            year={book.year!}
            description={book.description!}
            authorName={book.authorName!}
            authorId={book.authorId!}
          />
        ))}
      </div>
      <AddBookCard authors={authors} />
    </div>
  );
}
