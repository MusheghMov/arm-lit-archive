import { Minus } from "lucide-react";
import Image from "next/image";
import { getAuthor } from "@/actions";
import type { Metadata } from "next";

type Props = {
  params: { authorId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthor({ authorId: +params.authorId });

  return {
    title: author?.name,
    openGraph: {
      title: author?.name as string,
      description: author?.bio?.substring(0, 150),
      url: "https://litarchive.com/authors/" + params.authorId,
      type: "website",
      images: [author?.imageUrl as string],
    },
    twitter: {
      card: "summary_large_image",
      title: author?.name as string,
      description: author?.bio?.substring(0, 150),
      images: [author?.imageUrl as string],
    },
  };
}
export default async function AuthorPage({
  params,
}: {
  params: { authorId: string };
}) {
  const authorId = +params.authorId;

  const author = await getAuthor({ authorId: authorId });

  return (
    <div className="flex w-full flex-col items-start justify-between overflow-hidden lg:flex-row lg:space-x-10">
      <div className="flex w-full grow-[1] flex-col lg:w-auto">
        <div className="relative min-h-[650px] min-w-[500px] overflow-hidden lg:rounded-br-[100px]">
          <Image
            src={
              author?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
            }
            className="h-full w-full object-cover object-top"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={30}
            alt="author"
          />
        </div>
        <div className="flex w-full flex-row items-center justify-evenly gap-2 px-8 py-14">
          <div>
            <p className="text-xs uppercase">Born</p>
            <p className="text-base font-bold md:text-3xl">
              {new Date(author?.birthDate!)?.toLocaleDateString("en-GB", {
                weekday: undefined,
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-xs uppercase opacity-0">Born</p>
          </div>
          <Minus size="40px" />
          <div>
            <p className="text-xs uppercase">Died</p>
            <p className="text-base font-bold md:text-3xl">
              {new Date(author?.deathDate!)?.toLocaleDateString("en-GB", {
                weekday: undefined,
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-xs uppercase opacity-0">Born</p>
          </div>
        </div>
      </div>
      <div className="flex w-full grow-[2] flex-col space-y-10 px-8 py-4 lg:overflow-hidden lg:px-10">
        <div className="flex max-w-[900px] flex-col space-y-2">
          <p className="text-4xl font-medium capitalize">{author?.name}</p>
          <p className="text-gray-500">{author?.bio}</p>
        </div>
      </div>
    </div>
  );
}
