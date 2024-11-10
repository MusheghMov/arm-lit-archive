import BookCard from "@/components/BookCard";
import { getBooksByUserLikedBooks } from "@/actions";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();

  const books = await getBooksByUserLikedBooks({
    userId: userId!,
    chunkSize: 4000,
  });

  return (
    <div className="flex w-full flex-col items-start justify-between space-y-10 self-center px-4 md:px-8 lg:max-w-[80%] lg:p-0">
      {/* <p className="text-2xl font-bold capitalize"> my profile</p> */}
      <div className="flex flex-col space-y-4">
        <p className="font-bold capitalize">favorite books</p>
        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {books?.map((book: any) => (
            <BookCard key={book.book.id} book={book.book} isLiked={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
