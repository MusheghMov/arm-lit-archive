"use client";
import { AspectRatio } from "../ui/aspect-ratio";
import { BookImage, Star } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  addBoooksToUserLikedBooks,
  removeBoooksFromUserLikedBooks,
} from "@/app/books/actions";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";

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
  const { isSignedIn } = useUser();
  const router = useRouter();

  const { mutate: onLikeBook } = useMutation({
    mutationKey: ["addBoookToUserLikedBooks"],
    mutationFn: async (bookId: number) => {
      if (!dbUserId) {
        return;
      }
      return await addBoooksToUserLikedBooks({
        userId: dbUserId,
        bookId: bookId,
      });
    },
  });
  const { mutate: onUnlikeBook } = useMutation({
    mutationKey: ["removeBoookFromUserLikedBooks"],
    mutationFn: async (bookId: number) => {
      if (!dbUserId) {
        return;
      }
      return removeBoooksFromUserLikedBooks({
        userId: dbUserId,
        bookId: bookId,
      });
    },
  });

  return (
    <div
      className="group flex h-min w-full max-w-[200px] cursor-pointer flex-col space-y-1 overflow-hidden rounded border p-2 md:w-44"
      ref={ref}
      onClick={() => {
        router.push(`/books/${book.id}`);
      }}
    >
      <div className="overflow-hidden rounded">
        <AspectRatio
          ratio={12 / 12}
          className="relative transition-all group-hover:scale-125"
        >
          <BookImage className="h-full w-full text-slate-300" />
        </AspectRatio>
      </div>

      {isSignedIn ? (
        <Button
          className="h-fit w-fit p-2"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isLiked) {
              onUnlikeBook(book.id);
            } else {
              onLikeBook(book.id);
            }
          }}
        >
          <Star
            size={16}
            className={cn(isLiked && "fill-black dark:fill-white")}
          />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="h-fit w-fit p-2"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Star
                size={16}
                className={cn(isLiked && "fill-black dark:fill-white")}
              />
            </Button>
          </DialogTrigger>
          <DialogContent
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-max"
          >
            <DialogHeader>
              <DialogTitle>Want to save favorite books?</DialogTitle>
              <DialogDescription>
                Sing in to add books to your collection
              </DialogDescription>
            </DialogHeader>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </DialogContent>
        </Dialog>
      )}

      <div className="h-16 px-2 pt-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold capitalize">
          {book.title}
        </p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize text-slate-500">
          {book.titleTranslit}
        </p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-500">
          {book.authorName || "Author"}
        </p>
      </div>
    </div>
  );
});
