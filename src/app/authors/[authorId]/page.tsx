import BookCard from "@/components/BookCard";
import { getAuthor } from "./actions";
import { Minus } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function AuthorPage({
  params,
}: {
  params: { authorId: string };
}) {
  const authorId = +params.authorId;
  const author = await getAuthor(authorId);
  return (
    <div className="flex h-full w-full flex-col overflow-scroll lg:flex-row lg:space-x-20">
      <div className="flex flex-grow-0 flex-col">
        <div className="relative h-[500px] w-full overflow-hidden lg:h-full lg:rounded-br-[100px]">
          <Image
            src={
              author?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
            }
            className="h-full w-full object-cover"
            fill
            alt="author"
          />
        </div>
        <div className="flex flex-row items-center space-x-4 px-8 py-14">
          <div>
            <p className="text-xs uppercase">Born</p>
            <p className="text-4xl font-bold">
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
            <p className="text-4xl font-bold">
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
      <div className="flex flex-1 flex-col space-y-10 px-4 py-4 lg:overflow-hidden lg:px-10">
        <div className="flex flex-col space-y-2">
          <p className="text-4xl font-medium capitalize">{author?.name}</p>
          <p className="text-gray-500">{author?.bio}</p>
        </div>
        <div className="flex w-full flex-col space-y-2">
          <p className="text-2xl font-bold">Books</p>
          <div className="flex h-full w-full">
            {author?.books.length > 0 ? (
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                  {author?.books?.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            ) : (
              <p>No books</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
