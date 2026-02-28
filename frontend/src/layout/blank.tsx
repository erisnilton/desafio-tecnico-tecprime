export default function BlankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg--background flex flex-col">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
