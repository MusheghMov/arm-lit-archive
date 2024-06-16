export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-row items-start justify-between gap-x-10">
      {children}
    </div>
  );
}
