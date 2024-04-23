"use client";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import React from "react";
import {
  addBoooksToUserLikedBooks,
  getDbUser,
  removeBoooksFromUserLikedBooks,
} from "./actions";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LikeButton({
  bookId,
  isLiked,
}: {
  bookId: number;
  isLiked: boolean;
}) {
  const { userId, isSignedIn } = useAuth();
  const { data: dbUser } = useQuery({
    queryKey: ["dbUser", userId!],
    queryFn: () => {
      return getDbUser(userId!);
    },
  });

  const { mutate: onLikeBook } = useMutation({
    mutationKey: ["addBoookToUserLikedBooks"],
    mutationFn: (bookId: number) => {
      return addBoooksToUserLikedBooks({ userId: dbUser?.id!, bookId: bookId });
    },
  });

  const { mutate: onUnlikeBook } = useMutation({
    mutationKey: ["removeBoookFromUserLikedBooks"],
    mutationFn: (bookId: number) => {
      return removeBoooksFromUserLikedBooks({
        userId: dbUser?.id!,
        bookId: bookId,
      });
    },
  });

  return (
    <>
      {isSignedIn ? (
        <Button
          onClick={() => {
            if (isLiked) {
              onUnlikeBook(bookId);
            } else {
              onLikeBook(bookId);
            }
          }}
          size="icon"
          variant="outline"
        >
          <Star className={cn(isLiked && "fill-black dark:fill-white")} />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Star className={cn(isLiked && "fill-black dark:fill-white")} />
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
    </>
  );
}
