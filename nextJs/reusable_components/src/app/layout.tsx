import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spotifi Showcase",
  description: "Component Library Showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
