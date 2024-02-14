"use server";

import db from "@/db";
import { authors, books } from "@/db/schema";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

const BookScheme = z.object({
  title: z.string(),
  imageUrl: z.string(),
  text: z.string(),
  description: z.string(),
  year: z.number(),
  fileUrl: z.string(),
  authorId: z.number(),
});

export async function createBook(
  data: z.infer<typeof BookScheme>,
  authorId: number,
  authorName: string
) {
  const res = await db.insert(books).values({
    title: data.title,
    imageUrl: data.imageUrl,
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
