import NavBar from "@/Components/NavBar/NavBar";
import "./globals.css";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
};
export default RootLayout;

