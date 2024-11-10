"use server";

import db from "@/db";
import {
  articles,
  authors,
  books,
  userLikedBooks,
  userReadingProgress,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
const schemaForCreateBook = createInsertSchema(books);
const schemaForCreateAuthor = createInsertSchema(authors);

async function getDbUser(userId: string) {
  const res = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.sub, userId),
  });
  return res;
}

const getBook = async (bookId: number) => {
  const res = await db.query.books.findFirst({
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
  return res;
};

async function getNextBook(currentBookId: number) {
  const nextBook = await db.query.books.findFirst({
    where: (books, { gt }) => gt(books.id, currentBookId),
  });

  return nextBook || null;
}

async function getPreviousBook(currentBookId: number) {
  const previousBook = await db.query.books.findFirst({
    where: (books, { lt }) => lt(books.id, currentBookId),
    orderBy: (books, { desc }) => desc(books.id),
  });

  return previousBook;
}

const getBooks = async ({
  offset,
  limit,
  authorId,
  search = "",
  userId = "",
  chunkSize,
}: {
  offset?: number;
  limit?: number;
  authorId?: number;
  search?: string;
  userId?: string;
  chunkSize: number;
}) => {
  const dbUser = await getDbUser(userId);

  const res = await db.query.books.findMany({
    where: (books, { or, and, eq, like }) =>
      authorId
        ? and(
            like(books.title, `%${search}%`),
            like(books.titleTranslit, `%${search}%`),
            like(books.authorName, `%${search}%`),
            eq(books.authorId, authorId)
          )
        : or(
            like(books.title, `%${search}%`),
            like(books.titleTranslit, `%${search}%`),
            like(books.authorName, `%${search}%`)
          ),
    columns: {
      id: true,
      title: true,
      titleTranslit: true,
      authorId: true,
      authorName: true,
      description: true,
    },
    with: {
      userLikedBooks: {
        where: dbUser?.id
          ? eq(userLikedBooks.userId, dbUser?.id)
          : eq(userLikedBooks.userId, 0),
        extras: {
          isLiked: sql<boolean>`true`.as("isLiked"),
        },
      },
      userReadingProgress: {
        where: (userReadingProgress, { eq }) =>
          dbUser?.id
            ? eq(userReadingProgress.userId, dbUser?.id)
            : eq(userReadingProgress.userId, 0),
        extras: {
          lastPageNumber:
            sql<number>`ceil( ${userReadingProgress.lastCharacterIndex} / ${chunkSize} )`.as(
              "lastPageNumber"
            ),
        },
      },
    },
    extras: {
      textLength: sql<number>`length(${books.text})`.as("textLength"),
      bookPagesCount:
        sql<number>`ceil( length(${books.text}) / ${chunkSize} )`.as(
          "bookPagesCount"
        ),
    },

    limit,
    offset,
    orderBy: (books, { desc }) => desc(books.id),
  });
  return res;
};

const getBooksByUserLikedBooks = async ({
  userId,
  chunkSize,
}: {
  userId: string;
  chunkSize: number;
}) => {
  const dbUser = await getDbUser(userId);

  const res = await db.query.userLikedBooks.findMany({
    where: (userLikedBooks, { eq }) =>
      dbUser?.id
        ? eq(userLikedBooks.userId, dbUser?.id)
        : eq(userLikedBooks.userId, 0),
    with: {
      book: {
        columns: {
          id: true,
          title: true,
          titleTranslit: true,
          authorId: true,
          authorName: true,
          description: true,
        },
        extras: {
          bookPagesCount:
            sql<number>`ceil( length(${books.text} / ${chunkSize}) )`.as(
              "bookPagesCount"
            ),
        },
        with: {
          userLikedBooks: {
            where: (userLikedBooks, { eq }) =>
              dbUser?.id
                ? eq(userLikedBooks.userId, dbUser?.id)
                : eq(userLikedBooks.userId, 0),
            extras: {
              isLiked: sql<boolean>`true`.as("isLiked"),
            },
          },
          userReadingProgress: {
            where: (userReadingProgress, { eq }) =>
              dbUser?.id
                ? eq(userReadingProgress.userId, dbUser?.id)
                : eq(userReadingProgress.userId, 0),
            extras: {
              lastPageNumber:
                sql<number>`ceil( ${userReadingProgress.lastCharacterIndex} / ${chunkSize} )`.as(
                  "lastPageNumber"
                ),
            },
          },
        },
      },
    },
    orderBy: (userLikedBooks, { desc }) => desc(userLikedBooks.createdAt),
  });
  return res;
};

const getBookTextWithChunk = async ({
  bookId,
  currentPageNumber,
  chunkSize,
  userId = "",
}: {
  bookId: number;
  currentPageNumber: number;
  chunkSize: number;
  userId: string;
}) => {
  const dbUser = await getDbUser(userId);
  const result = await db.query.books.findFirst({
    where: eq(books.id, bookId),
    with: {
      userLikedBooks: {
        where: dbUser?.id
          ? eq(userLikedBooks.userId, dbUser?.id)
          : eq(userLikedBooks.userId, 0),
        extras: {
          isLiked: sql<boolean>`true`.as("isLiked"),
        },
      },
      userReadingProgress: {
        where: (userReadingProgress, { eq }) =>
          dbUser?.id
            ? eq(userReadingProgress.userId, dbUser?.id)
            : eq(userReadingProgress.userId, 0),
        extras: {
          lastPageNumber:
            sql<number>`ceil( ${userReadingProgress.lastCharacterIndex} / ${chunkSize} )`.as(
              "lastPageNumber"
            ),
        },
      },
    },
    extras: {
      text: sql<string>`substr(${books.text}, ${(currentPageNumber - 1) * chunkSize}, ${chunkSize})`.as(
        "text"
      ),
      textLength: sql<number>`length(${books.text})`.as("textLength"),
      bookPagesCount:
        sql<number>`ceil( length(${books.text}) / ${chunkSize} )`.as(
          "bookPagesCount"
        ),
    },
  });

  if (!dbUser?.id) {
    return result;
  }

  if (result?.userReadingProgress) {
    if (result?.userReadingProgress?.length === 0) {
      await db.insert(userReadingProgress).values({
        userId: dbUser?.id || 0,
        bookId: bookId,
        lastCharacterIndex:
          (currentPageNumber - 1) * chunkSize +
          (result?.text as string)?.length,
      });
    } else {
      const userProgressId = result.userReadingProgress[0].id;
      const lastCharacterIndex =
        result.userReadingProgress[0].lastCharacterIndex;

      if (lastCharacterIndex <= (currentPageNumber - 1) * chunkSize) {
        await db
          .update(userReadingProgress)
          .set({
            lastCharacterIndex:
              (currentPageNumber - 1) * chunkSize +
              (result?.text as string).length,
          })
          .where(eq(userReadingProgress.id, userProgressId));
      }
    }
  }

  const resultAfterProgressUpdate = await db.query.books.findFirst({
    where: eq(books.id, bookId),
    with: {
      userLikedBooks: {
        where: dbUser?.id
          ? eq(userLikedBooks.userId, dbUser?.id)
          : eq(userLikedBooks.userId, 0),
        extras: {
          isLiked: sql<boolean>`true`.as("isLiked"),
        },
      },
      userReadingProgress: {
        where: (userReadingProgress, { eq }) =>
          dbUser?.id
            ? eq(userReadingProgress.userId, dbUser?.id)
            : eq(userReadingProgress.userId, 0),
        extras: {
          lastPageNumber:
            sql<number>`ceil( ${userReadingProgress.lastCharacterIndex} / ${chunkSize} )`.as(
              "lastPageNumber"
            ),
        },
      },
    },
    extras: {
      text: sql<string>`substr(${books.text}, ${(currentPageNumber - 1) * chunkSize}, ${chunkSize})`.as(
        "text"
      ),
      textLength: sql<number>`length(${books.text})`.as("textLength"),
      bookPagesCount:
        sql<number>`ceil( length(${books.text}) / ${chunkSize} )`.as(
          "bookPagesCount"
        ),
    },
  });

  // revalidateTag("bookTextWithChunk");
  // revalidateTag("books");
  // revalidateTag("book");

  return resultAfterProgressUpdate;
};

async function createBook(
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
  // revalidateTag("books");
  // revalidateTag("bookTextWithChunk");

  return res;
}

async function addBooksToUserLikedBooks({
  userId = "",
  bookId,
}: {
  userId: string;
  bookId: number;
}) {
  const dbUser = await getDbUser(userId);

  const res = await db.insert(userLikedBooks).values({
    userId: dbUser?.id || 0,
    bookId: bookId,
  });

  // revalidateTag("bookTextWithChunk");
  // revalidateTag("books");
  // revalidateTag("booksUserLiked");
  return res;
}

async function removeBooksFromUserLikedBooks({
  userId = "",
  bookId,
}: {
  userId: string;
  bookId: number;
}) {
  const dbUser = await getDbUser(userId);

  const res = await db
    .delete(userLikedBooks)
    .where(
      and(
        eq(userLikedBooks.bookId, bookId),
        eq(userLikedBooks.userId, dbUser?.id || 0)
      )
    );

  // revalidateTag("bookTextWithChunk");
  // revalidateTag("books");
  // revalidateTag("booksUserLiked");

  return res;
}

const getAuthor = async ({ authorId }: { authorId: number }) => {
  const res = await db.query.authors.findFirst({
    where: (auhtors, { eq, and }) => and(eq(auhtors.id, authorId)),
    with: {
      books: {
        where: (books, { sql, gt }) => gt(sql`length(${books.text})`, 0),
      },
    },
  });
  return res;
};

async function getAuthors({ search }: { search?: string } = {}) {
  const res = await db.query.authors.findMany({
    where: (authors, { like }) =>
      like(authors.name, search ? `%${search}%` : "%"),
  });

  return res;
}

async function getArticles() {
  const articles = await db.query.articles.findMany();

  return articles;
}

async function getArticleBySlug({ slug }: { slug: string }) {
  const articleBySlug = await db.query.articles.findFirst({
    where: (articles, { eq }) => eq(articles.slug, slug),
  });

  return articleBySlug;
}

async function createAuthor(
  data: z.infer<typeof schemaForCreateAuthor>,
  imageUrl: string | undefined
) {
  const res = await db.insert(authors).values({
    name: data.name,
    imageUrl: imageUrl,
    bio: data.bio,
    birthDate: data.birthDate,
    deathDate: data.deathDate,
  });
  // revalidateTag("authors");

  return res;
}
export {
  getDbUser,
  getBook,
  getNextBook,
  getPreviousBook,
  getBooks,
  getBooksByUserLikedBooks,
  getBookTextWithChunk,
  getAuthor,
  createBook,
  addBooksToUserLikedBooks,
  removeBooksFromUserLikedBooks,
  createAuthor,
  getAuthors,
  getArticles,
  getArticleBySlug,
};
