import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Spotifi",
    description: "A Spotify clone built with Next.js",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
        <body>
            {children}
        </body>
        </html>
    );
};

export default RootLayout;