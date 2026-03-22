export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t px-6 py-4 mt-10">
      <p className="text-sm text-gray-500">
        Copyright © {currentYear} Profile Site
      </p>
    </footer>
  );
}
