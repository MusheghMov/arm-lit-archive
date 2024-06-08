"use client";

export default function BookErrorPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Book not found</h1>
      <p className="text-lg">The book you are looking for does not exist.</p>
    </div>
  );
}
