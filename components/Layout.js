import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link href="/"><a>Zora Creator</a></Link>
        </h1>
        <nav className="space-x-12">
          <Link href="/"><a className="text-gray-700">Home</a></Link>
          <Link href="/profile"><a className="text-gray-700">Profil</a></Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Zora Creator
      </footer>
    </div>
  );
}
