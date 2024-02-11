import AuthorForm from "@/components/AuthorForm";
import BookCard from "@/components/BookCard";
import { FileUploadForm } from "@/components/FileUploadForm";
import { Images } from "@/components/Images";

export default function Home() {
  return (
    <div>
      {/* <FileUploadForm /> */}
      {/**/}
      {/* <Images /> */}
      {/* <AuthorForm /> */}
      <div className="flex items-center justify-center">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
}
