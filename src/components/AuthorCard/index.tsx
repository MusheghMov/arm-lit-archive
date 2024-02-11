import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function AuthorCard({
  name,
  birthYear,
  deathYear,
  bio,
}: {
  name: string;
  birthYear: string;
  deathYear: string;
  bio: string;
}) {
  return (
    <div className="w-[200px]">
      <AspectRatio
        ratio={9 / 12}
        className="flex flex-col justify-end overflow-hidden rounded-lg border border-slate-500"
      >
        <div className="flex-[3]">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
            alt="Author's image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="z-10 flex h-full flex-1 flex-col items-center justify-center bg-slate-800 p-2 text-xs font-bold uppercase">
          <p>{name}</p>
          <p>
            {deathYear
              ? `${new Date(birthYear).getFullYear()} - ${new Date(deathYear).getFullYear()}`
              : new Date(birthYear).getFullYear()}
          </p>
        </div>
      </AspectRatio>
    </div>
  );
}
