import BookCard from "@/components/BookCard";
import { getBooksByUserLikedBooks } from "@/actions";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = auth();

  const books = await getBooksByUserLikedBooks({
    userId: userId!,
    chunkSize: 4000,
  });

  return (
    <div className="flex w-full flex-col items-start justify-between space-y-10 px-8 py-10">
      <div>
        <p className="text-2xl font-bold capitalize"> my profile</p>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="font-bold capitalize">liked books</p>
        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {books?.map((book: any) => (
            <BookCard key={book.book.id} book={book.book} isLiked={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
