import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { authors } from "@/db/schema";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
const AuthorSelectType = createSelectSchema(authors);

export default function AuthorCard({
  author,
}: {
  author: z.infer<typeof AuthorSelectType>;
}) {
  return (
    <Link
      href={{ pathname: `/authors/${author.id}` }}
      className="w-full rounded border p-1 md:w-[200px]"
    >
      <AspectRatio
        ratio={9 / 12}
        className="flex flex-col justify-end overflow-hidden"
      >
        <div className="flex-[3] overflow-hidden">
          <Image
            src={
              author?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
            }
            className="w-full rounded object-cover"
            width={200}
            height={300}
            loading="lazy"
            quality={10}
            alt="Author's image"
          />
        </div>
        <div className="z-10 flex h-full flex-1 flex-col items-center justify-center bg-background p-2 text-xs font-bold uppercase">
          <p className="text-center">{author?.name}</p>
          <p>
            {author?.deathDate
              ? `${new Date(author?.birthDate!).getFullYear()} - ${new Date(author?.deathDate!).getFullYear()}`
              : new Date(author?.birthDate!).getFullYear()}
          </p>
        </div>
      </AspectRatio>
    </Link>
  );
}
