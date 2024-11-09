import { getBooks } from "@/actions";
import BookCard from "@/components/BookCard";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function AuthorBooks({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { userId } = await auth();
  const { authorId } = await params;
  const booksByAuthor = await getBooks({
    authorId: +authorId,
    userId: userId!,
    chunkSize: 4000,
  });
  return (
    <div className="flex w-full flex-col space-y-2 px-8">
      <p className="text-2xl font-bold">Books</p>
      <div className="flex h-full w-full">
        {!!booksByAuthor && booksByAuthor.length > 0 ? (
          <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {booksByAuthor?.map((book: any) => (
              <BookCard
                key={book.id}
                book={book}
                isLiked={book?.userLikedBooks?.length > 0}
              />
            ))}
          </div>
        ) : (
          <p>No books</p>
        )}
      </div>
    </div>
  );
}
