import { Card } from "@/components/ui/Card";

export default function LibraryPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      <Card>
        <p className="text-gray-500">Your saved songs will appear here.</p>
      </Card>
    </div>
  );
}
