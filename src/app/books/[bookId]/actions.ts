"use server";
import db from "@/db";
import { books, userLikedBooks, userReadingProgress } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function getBook(bookId: number) {
  const res = await db.query.books.findMany({
    where: (books, { eq }) => eq(books.id, bookId),
    with: {
      author: true,
    },
    columns: {
      id: true,
      title: true,
      titleTranslit: true,
      authorId: true,
    },
    extras: {
      textLength: sql<number>`length(${books.text})`.as("textLength"),
    },
  });
  return res[0];
}
export async function getBookTextWithChunk({
  bookId,
  chunkStart,
  chunkSize,
  userId,
}: {
  bookId: number;
  chunkStart: number;
  chunkSize: number;
  userId: number;
}) {
  //get chunk of text with the length of chunkSize plus the length before the next '\n' character
  // const textQuery = sql`substr(${books.text}, ${chunkStart}, ${chunkSize} + instr(substr(${books.text}, ${chunkStart + chunkSize}, ${chunkSize}), '/n'))`;
  const result = await db
    .select({
      text: sql<string>`substr(${books.text}, ${chunkStart}, ${chunkSize})`,
      // textLength: sql`length(${books.text})`,
      // additionalChunkLength: sql`instr(substr(${books.text}, ${chunkStart + chunkSize}, ${chunkSize}), '\n')`,
      // additionalChunk: sql`substr(${books.text}, ${chunkStart + chunkSize}, ${chunkSize}), '\n'`,
    })
    .from(books)
    .where(sql`${books.id} = ${bookId}`);
  if (!userId) {
    return result[0];
  }

  const userProgress = await db.query.userReadingProgress.findMany({
    where: (userReadingProgress, { and, eq }) =>
      and(
        eq(userReadingProgress.userId, userId),
        eq(userReadingProgress.bookId, bookId)
      ),
  });

  if (userProgress.length) {
    const userProgressId = userProgress[0].id;
    const lastCharacterIndex = userProgress[0].lastCharacterIndex;

    if (lastCharacterIndex <= chunkStart) {
      await db
        .update(userReadingProgress)
        .set({
          lastCharacterIndex: chunkStart + (result[0].text as string).length,
        })
        .where(eq(userReadingProgress.id, userProgressId));
    }
  } else {
    await db.insert(userReadingProgress).values({
      userId: userId,
      bookId: bookId,
      lastCharacterIndex: chunkStart + (result[0].text as string).length,
    });
  }

  return result[0];
}

export async function getUserBookProgress({
  userId,
  bookId,
}: {
  userId: number;
  bookId: number;
}) {
  const res = await db.query.userReadingProgress.findMany({
    where: (userReadingProgress, { and, eq }) =>
      and(
        eq(userReadingProgress.userId, userId),
        eq(userReadingProgress.bookId, bookId)
      ),
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
