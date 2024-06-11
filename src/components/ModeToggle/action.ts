"use server";

import db from "@/db";
import { books } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getNextBook(currentBookId: number) {
  const nextBook = await db.query.books.findFirst({
    where: (books, { gt }) => gt(books.id, currentBookId),
  });

  return nextBook;
}

export async function getPreviousBook(currentBookId: number) {
  const previousBook = await db.query.books.findFirst({
    where: (books, { lt }) => lt(books.id, currentBookId),
    orderBy: desc(books.id),
  });

  return previousBook;
}
