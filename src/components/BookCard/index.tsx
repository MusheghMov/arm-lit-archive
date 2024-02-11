/* eslint-disable react/no-unescaped-entities */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShareIcon } from "lucide-react";
import Image from "next/image";

export default function BookCard({
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
    <Card className="group m-4 h-[300px] overflow-hidden rounded-xl bg-background shadow-md">
      <div className="flex h-full">
        <div className="shadow-md md:flex-shrink-0">
          <Image
            alt="Author's image"
            className="h-48 w-full object-cover md:h-full md:w-48 md:object-cover"
            height={299}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
            style={{
              aspectRatio: "448/299",
              objectFit: "cover",
            }}
            width={448}
          />
        </div>
        <div className="w-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:w-[500px] group-hover:opacity-100">
          <CardHeader>
            <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold">
              {name || "Author"}
            </CardTitle>
            <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
              {deathYear
                ? `${new Date(birthYear).toLocaleDateString()} - ${new Date(deathYear).toLocaleDateString()}`
                : new Date(birthYear).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2  line-clamp-3 text-gray-500">
            {bio || "Author's bio"}
          </CardContent>
          <div className="mt-5 flex w-full items-center justify-end">
            <Button size="icon" variant="ghost">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <ShareIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
