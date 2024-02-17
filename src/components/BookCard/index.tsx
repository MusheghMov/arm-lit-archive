import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { BookImage } from "lucide-react";
import { forwardRef } from "react";

export default forwardRef(function BookCard(
  {
    book,
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
  },
  ref: any
) {
  return (
    <Link
      href={{ pathname: `/books/${book.id}` }}
      className="group flex h-min w-32 cursor-pointer flex-col overflow-hidden rounded border p-1 md:w-44"
      ref={ref}
    >
      <div className="overflow-hidden rounded">
        <AspectRatio
          ratio={12 / 16}
          className="relative transition-all group-hover:scale-125"
        >
          <BookImage className="h-full w-full text-slate-300" />
          {/* <Image */}
          {/*   alt="Author's image" */}
          {/*   className="w-full object-cover" */}
          {/*   fill={true} */}
          {/*   loading="lazy" */}
          {/*   quality={10} */}
          {/*   src={ */}
          {/*     book.imageUrl || */}
          {/*     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg" */}
          {/*   } */}
          {/* /> */}
        </AspectRatio>
      </div>

      <div className="h-16 px-2 pt-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold capitalize">
          {book.title}
        </p>

        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
          {book.authorName || "Author"}
        </p>
      </div>
    </Link>
  );
});
