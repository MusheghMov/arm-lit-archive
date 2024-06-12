import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  sub: text("sub").unique(),
});
export const books = sqliteTable("books", {
  id: integer("id").primaryKey(),
  title: text("title"),
  titleTranslit: text("titleTranslit"),
  imageUrl: text("imageUrl"),
  description: text("description"),
  text: text("text"),
  year: integer("year"),
  sourceUrl: text("sourceUrl"),
  fileUrl: text("fileUrl"),
  authorName: text("author_name"),
  authorId: integer("author_id"),
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

export const userLikedBooks = sqliteTable("userLikedBooks", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const userLikedAuthors = sqliteTable("userLikedAuthors", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  authorId: integer("author_id")
    .notNull()
    .references(() => authors.id),
});

export const userReadingProgress = sqliteTable("userReadingProgress", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  lastCharacterIndex: integer("last_character_index").notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const userRelations = relations(user, ({ many }) => ({
  userLikedBooks: many(userLikedBooks),
  userLikedAuthors: many(userLikedAuthors),
  userReadingProgress: many(userReadingProgress),
}));

export const booksRelations = relations(books, ({ one, many }) => ({
  author: one(authors, {
    fields: [books.authorId],
    references: [authors.id],
  }),
  userLikedBooks: many(userLikedBooks),
  userReadingProgress: many(userReadingProgress),
}));

export const authorRelations = relations(authors, ({ many }) => ({
  books: many(books),
  userLikedAuthors: many(userLikedAuthors),
}));

export const userLikedBooksRelations = relations(userLikedBooks, ({ one }) => ({
  user: one(user, {
    fields: [userLikedBooks.userId],
    references: [user.id],
  }),
  book: one(books, {
    fields: [userLikedBooks.bookId],
    references: [books.id],
  }),
}));

export const userReadingProgressRelations = relations(
  userReadingProgress,
  ({ one }) => ({
    user: one(user, {
      fields: [userReadingProgress.userId],
      references: [user.id],
    }),
    book: one(books, {
      fields: [userReadingProgress.bookId],
      references: [books.id],
    }),
  })
);
