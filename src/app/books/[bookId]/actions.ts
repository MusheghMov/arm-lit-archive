"use server";
import db from "@/db";
import { userLikedBooks } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function getBook(bookId: number) {
  const res = await db.query.books.findMany({
    where: (books, { eq }) => eq(books.id, bookId),
    with: {
      author: true,
    },
  });
  return res[0];
}
export async function addBoooksToUserLikedBooks({
  userId,
  bookId,
}: {
  userId: number;
  bookId: number;
}) {
  const res = await db.insert(userLikedBooks).values({
    userId: userId,
    bookId: bookId,
  });
  revalidateTag("books");
  return res;
}

export async function removeBoooksFromUserLikedBooks({
  userId,
  bookId,
}: {
  userId: number;
  bookId: number;
}) {
  const res = await db
    .delete(userLikedBooks)
    .where(
      and(eq(userLikedBooks.bookId, bookId), eq(userLikedBooks.userId, userId))
    );

  revalidateTag("books");

  return res;
}

export async function getBooksByUserLikedBooks({ userId }: { userId: number }) {
  const res = await db.query.userLikedBooks.findMany({
    columns: {
      bookId: true,
    },
    where: (userLikedBooks, { eq }) => eq(userLikedBooks.userId, userId),
  });
  return res;
}

export async function getDbUser(userId: string) {
  const res = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.sub, userId),
  });
  return res;
}
