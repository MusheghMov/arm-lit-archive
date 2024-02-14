import db from "@/db";
import { authors } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAuthor(authorId: number) {
  const res = await db.query.authors.findMany({
    where: eq(authors.id, authorId),
    with: {
      books: true,
    },
  });
  return res[0];
}
