import db from "@/db";

export async function getAuthor(authorId: number) {
  const res = await db.query.authors.findMany({
    where: (auhtors, { eq, and }) => and(eq(auhtors.id, authorId)),
    with: {
      books: true,
    },
  });
  return res[0];
}
