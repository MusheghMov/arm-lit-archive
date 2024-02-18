import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import BookCard from "../BookCard";
import { books } from "@/db/schema";
import { MoveRight } from "lucide-react";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import Link from "next/link";
const BookSelectType = createSelectSchema(books);

export default function RecommendationSection({
  books,
  title,
  href,
}: {
  books: z.infer<typeof BookSelectType>[];
  title: string;
  href: string;
}) {
  return (
    <div className="flex w-full flex-col space-y-3">
      <Link
        href={href || ""}
        className="flex w-fit flex-row space-x-2 hover:underline lg:pl-16"
      >
        <span>{title}</span>
        <MoveRight />
      </Link>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {books.map((book) => (
            <CarouselItem
              key={book.id}
              className="flex justify-center p-0 md:basis-1/3 lg:basis-1/5"
            >
              <BookCard book={book} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
