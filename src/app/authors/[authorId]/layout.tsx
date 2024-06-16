import React from "react";

export default function Layout({
  children,
  authorBooks,
}: {
  children: React.ReactNode;
  authorBooks: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-start justify-between pb-10">
      {children}
      {authorBooks}
    </div>
  );
}
