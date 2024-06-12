import db from "@/db";

export async function getAuthor(authorId: number) {
  const res = await db.query.authors.findMany({
    where: (auhtors, { eq, and }) => and(eq(auhtors.id, authorId)),
    with: {
      books: {
        where: (books, { sql, gt }) => gt(sql`length(${books.text})`, 0),
      },
    },
  });
  return res[0];
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

export async function getDbUser(userId: string) {
  const res = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.sub, userId),
  });
  return res;
}
