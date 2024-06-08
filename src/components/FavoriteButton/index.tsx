"use client";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import {
  addBoooksToUserLikedBooks,
  removeBoooksFromUserLikedBooks,
} from "@/app/books/actions";
import { useState } from "react";

export default function FavoriteButton({
  isLiked,
  dbUserId,
  bookId,
}: {
  isLiked?: boolean;
  dbUserId?: number;
  bookId: number;
}) {
  const { isSignedIn } = useUser();
  const [isBookLiked, setIsBookLiked] = useState(isLiked);
  const { mutate: onLikeBook } = useMutation({
    mutationKey: ["addBoookToUserLikedBooks"],
    mutationFn: async (bookId: number) => {
      if (!dbUserId) {
        return;
      }
      setIsBookLiked(true);
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
      setIsBookLiked(false);
      return removeBoooksFromUserLikedBooks({
        userId: dbUserId,
        bookId: bookId,
      });
    },
  });
  return (
    <>
      {isSignedIn ? (
        <Button
          className="h-fit w-fit rounded-full border-primary/40 bg-background p-2 hover:bg-background/30"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isBookLiked) {
              onUnlikeBook(bookId);
            } else {
              onLikeBook(bookId);
            }
          }}
        >
          <Star
            size={16}
            className={cn(
              "stroke-primary/70",
              isBookLiked && "fill-primary/70"
            )}
          />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="h-fit w-fit rounded-full border-primary/40 bg-background p-2 hover:bg-background/30"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Star
                size={16}
                className={cn(
                  "stroke-primary/70",
                  isBookLiked && "fill-primary/70"
                )}
              />
            </Button>
          </DialogTrigger>
          <DialogContent
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-max p-8"
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
    </>
  );
}
