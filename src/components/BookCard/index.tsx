import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { BookImage } from "lucide-react";

export default function BookCard({
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
}) {
  return (
    <Link
      href={{ pathname: `/books/${book.id}` }}
      className="group flex h-min w-44 cursor-pointer flex-col overflow-hidden rounded border p-1"
    >
      <div className="overflow-hidden rounded">
        <AspectRatio
          ratio={12 / 16}
          className="relative transition-all group-hover:scale-125"
        >
          <BookImage className="h-full w-full" />
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

    // <Card className="group m-4 h-[300px] overflow-hidden rounded-xl bg-background shadow-md">
    //   <div className="flex h-full">
    //     <div className="w-48 shadow-md">
    //       <AspectRatio ratio={9 / 16} className="relative">
    //         <Image
    //           alt="Author's image"
    //           className="w-full object-cover"
    //           fill={true}
    //           loading="lazy"
    //           quality={10}
    //           src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
    //         />
    //       </AspectRatio>
    //     </div>
    //     <div className="flex w-0 flex-col justify-between overflow-hidden opacity-0 transition-all duration-500 group-hover:w-[400px] group-hover:opacity-100">
    //       <CardHeader>
    //         <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold">
    //           {title || "Author"}
    //         </CardTitle>
    //         <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
    //           <Link href={`/authors/${authorId}`} className="hover:underline">
    //             {authorName || "Author"}
    //           </Link>
    //           <br />
    //           {year || "Year"}
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent className="mt-2  line-clamp-3 text-gray-500">
    //         {description || "Description"}
    //       </CardContent>
    //       <div className="mt-5 flex w-full items-center justify-end">
    //         <Button size="icon" variant="ghost">
    //           <Heart className="h-5 w-5" />
    //         </Button>
    //         <Button size="icon" variant="ghost">
    //           <ShareIcon className="h-5 w-5" />
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </Card>
  );
}
