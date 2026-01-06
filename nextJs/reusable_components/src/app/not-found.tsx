import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center p-4">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Could not find requested resource</p>
      <Link href="/home">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
