import BookCard from "@/components/BookCard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col space-y-10 bg-background p-8 font-sans">
      <Header />
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
