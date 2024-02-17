import Image from "next/image";
import { getBook } from "./actions";
import { FileText } from "lucide-react";

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const authorId = +params.bookId;
  const book = await getBook(authorId);
  return (
    <div className="flex w-full flex-col items-center space-y-6 overflow-scroll py-4">
      <div className="flex min-h-[600px] w-full flex-col-reverse lg:flex-row">
        <div className="flex flex-1 flex-col items-end space-y-2 px-8">
          <p className="text-3xl font-bold">{book?.title}</p>
          <p className="text-slate-500">
            {book?.author?.name} {book?.year! > 0 && `| ${book?.year}`}
          </p>
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
        <div className="relative h-full w-full overflow-hidden lg:flex-1 lg:rounded-bl-[100px]">
          <Image
            src={
              book?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
            }
            alt="book"
            className="h-full w-full object-cover"
            fill
          />
        </div>
      </div>
      <pre className="flex w-full items-center justify-center whitespace-pre-wrap px-4 lg:px-24">
        {book?.text}
      </pre>
    </div>
  );
}
