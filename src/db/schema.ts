import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email"),
});

export const authors = sqliteTable("author", {
  id: integer("id").primaryKey(),
  name: text("name"),
  imageUrl: text("imageUrl"),
  color: text("color"),
  bio: text("bio"),
  birthDate: text("birthDate"),
  deathDate: text("deathDate"),
});

export const authorRelations = relations(authors, ({ many }) => ({
  books: many(books),
}));

export const books = sqliteTable("books", {
  id: integer("id").primaryKey(),
  title: text("title"),
  year: text("year"),
  fileUrl: text("fileUrl"),
  authorId: integer("author_id"),
});

export const booksRelations = relations(books, ({ one }) => ({
  author: one(authors, {
    fields: [books.authorId],
    references: [authors.id],
  }),
}));
