import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Courses</h1>
          <nav className="flex gap-6">
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              Courses
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 