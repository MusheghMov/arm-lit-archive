import { getAuthor } from "./actions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AuthorPage({
  params,
}: {
  params: { authorId: string };
}) {
  const authorId = +params.authorId;
  const author = await getAuthor(authorId);
  return (
    <div className="w-full space-y-6">
      <Link href="../authors">
        <ChevronLeft />
      </Link>
      <p>{author?.name}</p>
      <p>{author?.bio}</p>
      <div className="flex w-full flex-col">
        <p className="text-2xl font-bold">Books</p>
        <div className="flex w-full flex-row flex-wrap gap-6">
          {author?.books?.map((book) => (
            <div key={book.id} className="flex w-1/4 flex-col">
              <p>{book.title}</p>
              <p>{book.year}</p>
              <p>{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
