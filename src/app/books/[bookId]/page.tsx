import { getBookTextWithChunk } from "@/actions";
import BookContent from "@/components/BookContent";
import { auth } from "@clerk/nextjs/server";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: { bookId: string };
  searchParams: { page: string };
}) {
  const { userId } = auth();
  let book = null;

  try {
    book = await getBookTextWithChunk({
      bookId: +params.bookId,
      currentPageNumber: +searchParams.page,
      chunkSize: 4000,
      userId: userId!,
    });
  } catch (error) {
    console.error("error", error);
  }

  if (!book) {
    return (
      <div className="absolute flex h-[100cqh] w-full flex-col items-center justify-center space-y-4 p-2 text-center">
        <h1 className="text-4xl font-bold">Book not found</h1>
        <p className="text-lg">The book you are looking for does not exist.</p>
      </div>
    );
  }

  return <BookContent book={book} pageNumber={+searchParams.page} />;
}
