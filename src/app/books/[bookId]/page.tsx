import { getBook } from "./actions";
import { FileText } from "lucide-react";
import Link from "next/link";

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const authorId = +params.bookId;
  const book = await getBook(authorId);
  return (
    <div className="flex w-full flex-col items-center space-y-10 overflow-scroll py-4 lg:pt-8">
      <div className="flex w-full flex-col-reverse lg:flex-row">
        <div className="flex w-full flex-col items-center space-y-2 px-8">
          <p className="text-center text-3xl font-bold">{book?.title}</p>
          <p className="text-center text-slate-500">{book?.titleTranslit}</p>
          <div className="flex flex-row space-x-1 text-slate-500">
            <Link
              href={`/authors/${book.author?.id}`}
              className="hover:underline"
            >
              {book?.author?.name}
            </Link>
            <p>{book?.year! > 0 && `| ${book?.year}`}</p>
          </div>
          {book?.sourceUrl && (
            <a
              target="_blank"
              href={book?.sourceUrl}
              className="text-slate-500"
            >
              <FileText />
            </a>
          )}
        </div>
        {/* <div className="relative h-full w-full overflow-hidden lg:flex-1 lg:rounded-bl-[100px]"> */}
        {/*   <Image */}
        {/*     src={ */}
        {/*       book?.imageUrl || */}
        {/*       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg" */}
        {/*     } */}
        {/*     alt="book" */}
        {/*     className="h-full w-full object-cover" */}
        {/*     fill */}
        {/*   /> */}
        {/* </div> */}
      </div>
      <pre className="flex w-full items-center justify-center whitespace-pre-wrap px-4 lg:px-24">
        {book?.text}
      </pre>
    </div>
  );
}
