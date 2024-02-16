import db from "@/db";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getBook(bookId: number) {
  const res = await db.query.books.findMany({
    where: eq(books.id, bookId),
    with: {
      author: true,
    },
  });
  return res[0];
}
