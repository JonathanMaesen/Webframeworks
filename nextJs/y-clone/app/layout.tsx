import "./globals.css";
import NavBar from "@/Components/NavBar/NavBar";

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
