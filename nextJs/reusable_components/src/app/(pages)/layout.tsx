import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  async function logout() {
    "use server";
    (await cookies()).delete("session");
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/home" className="text-xl font-bold text-green-500">
            Spotifi
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/home" className="text-sm font-medium hover:text-green-500">
              Home
            </Link>
            <Link href="/library" className="text-sm font-medium hover:text-green-500">
              Library
            </Link>
          </nav>

          <div className="flex items-center gap-4">
             <form action={logout}>
                <Button variant="ghost" type="submit">Logout</Button>
             </form>
          </div>
        </div>
      </header>
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
