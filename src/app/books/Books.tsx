"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBooks } from "./actions";
import BookCard from "@/components/BookCard";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function Books({
  likedBooks,
  dbUserId,
}: {
  likedBooks?: number[];
  dbUserId: number;
}) {
  const { register, watch } = useForm({ defaultValues: { search: "" } });
  const {
    data: infiniteData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteBooks", { search: watch("search") }],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getBooks({ offset: pageParam, search: watch("search") });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const length = allPages.length;
      if (lastPage.length < 30) {
        return undefined;
      }
      return length * 30;
    },
  });

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, fetchNextPage]);

  return (
    <div className="flex w-full flex-col gap-6">
      <Input
        {...register("search")}
        className="max-w-[400px]"
        placeholder="Search for book by title or author name"
      />
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="flex flex-row flex-wrap">
        <div className="grid grid-cols-2 justify-between gap-6 md:flex md:flex-row md:flex-wrap md:justify-start">
          {infiniteData?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((book, i) => {
                if (i === page.length - 1) {
                  return (
                    <BookCard
                      key={book.id}
                      ref={ref}
                      book={book}
                      isLiked={likedBooks?.includes(book.id)}
                      dbUserId={dbUserId}
                    />
                  );
                }

                return (
                  <BookCard
                    key={book.id}
                    book={book}
                    isLiked={likedBooks?.includes(book.id)}
                    dbUserId={dbUserId}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
        {isFetchingNextPage && (
          <div className="flex w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
