import { getBook } from "./actions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const authorId = +params.bookId;
  const author = await getBook(authorId);
  return (
    <div className="w-full space-y-6">
      <Link href="../authors">
        <ChevronLeft />
      </Link>
      <p>{author?.title}</p>
      <p>{author?.text}</p>
      <p>{author?.year || "no year"}</p>
      <p>{author?.sourceUrl || "no sourse url"}</p>
      <p>{author?.authorName}</p>
      <p>{author?.description || "no description"}</p>
      <p>{author?.titleTranslit || "no trnslit"}</p>
      <div className="flex w-full flex-col">
        <p className="text-2xl font-bold">Books</p>
        {/* <div className="flex w-full flex-row flex-wrap gap-6"> */}
        {/*   {author?.books?.map((book) => ( */}
        {/*     <div key={book.id} className="flex w-1/4 flex-col"> */}
        {/*       <p>{book.title}</p> */}
        {/*       <p>{book.year}</p> */}
        {/*       <p>{book.description}</p> */}
        {/*     </div> */}
        {/*   ))} */}
        {/* </div> */}
      </div>
    </div>
  );
}
