"use client";

import { AspectRatio } from "../ui/aspect-ratio";
import { BookImage } from "lucide-react";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

export default forwardRef(function BookCard(
  {
    book,
    isLiked,
    dbUserId,
  }: {
    book: {
      id: number;
      text: string | null;
      imageUrl: string | null;
      description: string | null;
      title: string | null;
      titleTranslit: string | null;
      year: number | null;
      sourceUrl: string | null;
      fileUrl: string | null;
      authorName: string | null;
      authorId: number | null;
    };
    isLiked?: boolean;
    dbUserId?: number;
  },
  ref: any
) {
  const router = useRouter();

  return (
    <div
      className="group flex !h-min w-full cursor-pointer flex-col space-y-1 justify-self-center overflow-hidden rounded-md border border-foreground/20 bg-card-foreground/5 hover:border-primary/60"
      ref={ref}
      onClick={() => {
        router.push(`/books/${book.id}`);
      }}
    >
      <div className="overflow-hidden rounded">
        <AspectRatio
          ratio={5 / 4}
          className="relative flex items-center justify-center transition-all group-hover:scale-125"
        >
          <BookImage size={100} className="stroke-foreground text-slate-300" />
        </AspectRatio>
      </div>

      <div className="flex w-full flex-col items-start justify-between gap-3 px-2 pb-2">
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-col items-start justify-center">
            <p className="line-clamp-1 text-sm font-bold uppercase">
              {book.title}
            </p>
            <p className="line-clamp-1 text-sm font-light uppercase text-gray-400">
              {book.titleTranslit}
            </p>
          </div>
          <FavoriteButton
            bookId={book.id}
            isLiked={isLiked}
            dbUserId={dbUserId}
          />
        </div>

        <p className="line-clamp-1 text-sm font-bold uppercase">
          {book.authorName || "Author"}
        </p>
      </div>
    </div>
  );
});
