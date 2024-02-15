"use server";

import db from "@/db";
import { authors, books } from "@/db/schema";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
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

export async function getBooks() {
  const res = await db.select().from(books);
  revalidateTag("books");
  return res;
}

export async function getBooksByAuthor(authorId: number) {
  const res = await db.select().from(books).where(eq(books.authorId, authorId));
  revalidateTag("books");
  return res;
}

export async function getAuthors() {
  const res = await db.select().from(authors);
  revalidateTag("authors");
  return res;
}
