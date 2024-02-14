import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddBooksForm from "./AddBooksForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUser } from "lucide-react";

type AuthorType = {
  imageUrl: string | null;
  id: number;
  name: string | null;
  color: string | null;
  bio: string | null;
  birthDate: string | null;
  deathDate: string | null;
}[];

export const AddBookCard = ({ authors }: { authors: AuthorType }) => {
  return (
    <Card className="h-max w-[400px]">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex-1">
          <CardTitle>Add book here</CardTitle>
          <CardDescription>add your favourite books</CardDescription>
        </div>
        <div>
          <Avatar className="h-11 w-11">
            <AvatarImage src="" />
            <AvatarFallback>
              <Label htmlFor="avatar" className="h-full w-full cursor-pointer">
                <CircleUser className="h-full w-full" />
              </Label>
              <Input type="file" id="avatar" className="hidden" />
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <AddBooksForm authors={authors} />
      </CardContent>
    </Card>
  );
};
