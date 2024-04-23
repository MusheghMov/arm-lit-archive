"use server";

import db from "@/db";
import { authors, books, userLikedBooks } from "@/db/schema";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { and, desc, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

const schemaForCreateBook = createInsertSchema(books);

export async function createBook(
  data: z.infer<typeof schemaForCreateBook>,
  authorId: number,
  authorName: string,
  bookImageUrl: string | undefined
) {
  const res = await db.insert(books).values({
    title: data.title,
    titleTranslit: data.titleTranslit,
    sourceUrl: data.sourceUrl,
    imageUrl: bookImageUrl,
    text: data.text,
    year: data.year,
    fileUrl: data.fileUrl,
    authorId: authorId,
    authorName: authorName,
    description: data.description,
  });
  revalidateTag("books");

  return res;
}

export async function getBooks({
  offset,
  limit = 30,
  search = "",
}: {
  offset?: number;
  limit?: number;
  search?: string;
}) {
  const res = await db.query.books.findMany({
    where: (books, { or, like }) =>
      or(
        like(books.title, `%${search}%`),
        like(books.titleTranslit, `%${search}%`),
        like(books.authorName, `%${search}%`)
      ),
    with: {
      userLikedBooks: true,
    },

    limit,
    offset,
    orderBy: desc(books.id),
  });
  revalidateTag("books");
  return res;
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

export async function getDbUser(userId: string) {
  const res = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.sub, userId),
  });
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

export async function getBooksByAuthor(
  { authorId, limit }: { authorId: number; limit?: number } = { authorId: 0 }
) {
  const res = await db.query.books.findMany({
    where: eq(books.authorId, authorId),
    with: {
      author: true,
    },
    limit: limit,
    orderBy: desc(books.id),
  });

  revalidateTag("books");
  return res;
}

export async function getAuthors() {
  const res = await db.select().from(authors);
  revalidateTag("authors");
  return res;
}
