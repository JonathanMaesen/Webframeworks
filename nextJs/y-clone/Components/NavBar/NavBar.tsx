import Link from "next/link";
import { cookies } from "next/headers";

export default async function NavBar() {
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex gap-4">
                <Link href="/home" className="text-xl font-bold">Home</Link>
                <Link href="/admin/seed" className="hover:underline">Seed</Link>
            </div>
            <div>
                {username ? (
                    <div className="flex gap-4 items-center">
                        <span>Welcome, {username}</span>
                        <form action="/api/logout" method="POST">
                            <button type="submit" className="hover:underline text-red-300">Logout</button>
                        </form>
                    </div>
                ) : (
                    <Link href="/login" className="hover:underline">Login</Link>
                )}
            </div>
        </nav>
    );
}