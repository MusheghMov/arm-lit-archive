import React from "react";

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full w-full px-8">{children}</div>;
}
