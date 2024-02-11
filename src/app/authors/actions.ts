"use server";

import db from "@/db";
import { authors } from "@/db/schema";
import { z } from "zod";
import { revalidateTag } from "next/cache";

const authorScheme = z.object({
  name: z.string().min(1, {
    message: "Author name is required",
  }),
  bio: z.string().optional(),
  birthDate: z.string().optional(),
  deathDate: z.string().optional(),
});

export async function createAuthor(data: z.infer<typeof authorScheme>) {
  const res = await db.insert(authors).values({
    name: data.name,
    bio: data.bio,
    birthDate: data.birthDate,
    deathDate: data.deathDate,
  });
  revalidateTag("authors");

  return res;
}

export async function getAuthors() {
  const res = await db.select().from(authors);
  revalidateTag("authors");
  return res;
}
