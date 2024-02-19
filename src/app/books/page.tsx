import BooksContainer from "./BooksContainer";
import Books from "./Books";

export default async function AuthorsPage() {
  return (
    <div className="flex w-full flex-row items-start justify-between space-x-10 overflow-scroll px-8 py-4">
      <BooksContainer>
        <Books />
      </BooksContainer>
    </div>
  );
}
