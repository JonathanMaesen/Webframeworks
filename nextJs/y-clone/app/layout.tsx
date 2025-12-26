import "./globals.css";
import Link from "next/link";

const NavBar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <Link href="/home" className="text-xl font-bold">Home</Link>
            <Link href={"/navigatiemenu"}>Navigation</Link>
            <Link href="/admin/seed" className="hover:underline">Seed</Link>
        </nav>
    );
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-gray-100 min-h-screen">
                <NavBar/>
                <main className="container mx-auto p-4">
                    {children}
                </main>
            </body>
        </html>
    );
};
export default RootLayout;
