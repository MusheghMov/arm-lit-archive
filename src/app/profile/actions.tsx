import db from "@/db";
import { userLikedBooks } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function getBooksByUserLikedBooks({ userId }: { userId: number }) {
  const res = await db.query.userLikedBooks.findMany({
    where: eq(userLikedBooks.userId, userId),
    with: {
      book: true,
    },
    orderBy: desc(userLikedBooks.createdAt),
  });
  revalidateTag("books");
  return res;
}
