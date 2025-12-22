import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex gap-4 p-4 bg-gray-800 text-white shadow-md">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/all" className="hover:text-gray-300 transition-colors">All</Link>
            <Link href="/paging" className="hover:text-gray-300 transition-colors">Paging</Link>
            <Link href="/search" className="hover:text-gray-300 transition-colors">Search</Link>
            <Link href="/sorting" className="hover:text-gray-300 transition-colors">Sorting</Link>
        </nav>
    );
};