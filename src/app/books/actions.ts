"use server";

import db from "@/db";
import { authors, books } from "@/db/schema";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { desc, eq } from "drizzle-orm";
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
    limit,
    offset,
    orderBy: desc(books.id),
  });
  revalidateTag("books");
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
