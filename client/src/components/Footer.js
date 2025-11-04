export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyApp. Built with 💙 React + Tailwind.
      </div>
    </footer>
  );
}
