"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBooks } from "./actions";
import BookCard from "@/components/BookCard";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

export default function Books() {
  const {
    data: infiniteData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteBooks"],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getBooks({ offset: pageParam });
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
    <div className="flex flex-row flex-wrap gap-6">
      <div className="flex flex-row flex-wrap justify-around gap-6 md:justify-start">
        {infiniteData?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((book, i) => {
              if (i === page.length - 1) {
                return <BookCard key={book.id} ref={ref} book={book} />;
              }

              return <BookCard key={book.id} book={book} />;
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
  );
}
