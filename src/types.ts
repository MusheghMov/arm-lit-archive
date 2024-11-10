import { type InferSelectModel } from "drizzle-orm";
import { books, authors, user, articles } from "@/db/schema";

export type Book = InferSelectModel<typeof books>;
export type Author = InferSelectModel<typeof authors>;
export type User = InferSelectModel<typeof user>;
export type Article = InferSelectModel<typeof articles>;
