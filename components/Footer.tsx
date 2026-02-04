export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} Smart Web Tools</p>
        <p>Fast • Free • Privacy Friendly</p>
      </div>
    </footer>
  );
}
