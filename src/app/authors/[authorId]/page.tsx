import BookCard from "@/components/BookCard";
import { getAuthor } from "./actions";
import { Minus } from "lucide-react";
import Image from "next/image";

export default async function AuthorPage({
  params,
}: {
  params: { authorId: string };
}) {
  const authorId = +params.authorId;
  const author = await getAuthor(authorId);
  return (
    <div className="flex w-full flex-col items-start justify-between overflow-hidden pb-10 lg:flex-row lg:space-x-10">
      <div className="flex w-full grow-[1] flex-col lg:w-auto">
        <div className="relative min-h-[650px] min-w-[500px] overflow-hidden lg:rounded-br-[100px]">
          <Image
            src={
              author?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
            }
            className="h-full w-full object-cover object-top"
            fill
            quality={50}
            alt="author"
          />
        </div>
        <div className="flex w-full flex-row items-center justify-evenly gap-2 px-8 py-14">
          <div>
            <p className="text-xs uppercase">Born</p>
            <p className="text-base font-bold md:text-3xl">
              {new Date(author.birthDate!)?.toLocaleDateString("en-GB", {
                weekday: undefined,
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-xs uppercase opacity-0">Born</p>
          </div>
          <Minus size="40px" />
          <div>
            <p className="text-xs uppercase">Died</p>
            <p className="text-base font-bold md:text-3xl">
              {new Date(author.deathDate!)?.toLocaleDateString("en-GB", {
                weekday: undefined,
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-xs uppercase opacity-0">Born</p>
          </div>
        </div>
      </div>
      <div className="flex w-full grow-[2] flex-col space-y-10 px-8 py-4 lg:overflow-hidden lg:px-10">
        <div className="flex max-w-[900px] flex-col space-y-2">
          <p className="text-4xl font-medium capitalize">{author?.name}</p>
          <p className="text-gray-500">{author?.bio}</p>
        </div>
        <div className="flex w-full flex-col space-y-2">
          <p className="text-2xl font-bold">Books</p>
          <div className="flex h-full w-full">
            {author?.books.length > 0 ? (
              <div className="grid grid-cols-2 justify-between gap-6 md:flex md:flex-row md:flex-wrap md:justify-start">
                {author?.books?.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <p>No books</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
