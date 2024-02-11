import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddAuthorsForm from "./AddAuthorsForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUser } from "lucide-react";

export const AddAuthorCard = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex-1">
          <CardTitle>Add Author Here</CardTitle>
          <CardDescription>Add your favorit authors</CardDescription>
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
        <AddAuthorsForm />
      </CardContent>
    </Card>
  );
};
