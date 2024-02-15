import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export default function AuthorCard({
  author,
}: {
  author: {
    id: number;
    name: string | null;
    imageUrl: string | null;
    color: string | null;
    bio: string | null;
    birthDate: string | null;
    deathDate: string | null;
  };
}) {
  return (
    <Link
      href={{ pathname: `/authors/${author.id}` }}
      className="w-[200px] rounded border p-1"
    >
      <AspectRatio
        ratio={9 / 12}
        className="flex flex-col justify-end overflow-hidden"
      >
        <div className="flex-[3]">
          <Image
            src={
              author?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
            }
            className="rounded"
            loading="lazy"
            quality={10}
            alt="Author's image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="z-10 flex h-full flex-1 flex-col items-center justify-center bg-background p-2 text-xs font-bold uppercase">
          <p>{author?.name}</p>
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
