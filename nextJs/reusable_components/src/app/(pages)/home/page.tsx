import { db } from "@/database/client";
import { DataGrid } from "@/components/DataGrid";
import { Card } from "@/components/ui/Card";
import { SearchFilter } from "@/components/SearchFilter";
import { Button } from "@/components/ui/Button";
import { SortSelect } from "@/components/SortSelect";
import { WithId, Document, Collection } from "mongodb";

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string; sort?: string; order?: string }>;
}

interface Song extends WithId<Document> {
  title: string;
  artist: string;
  duration?: number;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { q, page, sort, order } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 8;
  const skip = (currentPage - 1) * pageSize;

  // Build Query
  const query: any = {};
  if (q) {
    const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query.title = { $regex: escapedQ, $options: "i" };
  }

  // Build Sort
  const sortOptions: any = {};
  if (sort) {
    sortOptions[sort] = order === "desc" ? -1 : 1;
  } else {
    sortOptions._id = -1; // Default sort
  }

  // Fetch Data
  const collection = db.collection("songs") as Collection<Song>;
  const totalCount = await collection.countDocuments(query);
  const songs = await collection
    .find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize)
    .toArray();

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Music Library</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <SearchFilter />
          <SortSelect 
            options={[
              { label: "Title", value: "title" },
              { label: "Artist", value: "artist" },
              { label: "Duration", value: "duration" },
            ]} 
          />
        </div>
      </div>

      <DataGrid
        data={songs}
        page={currentPage}
        totalPages={totalPages}
        baseUrl="/home"
        renderItem={(song) => (
          <Card className="h-full flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="aspect-square bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                🎵
              </div>
              <h3 className="font-bold text-lg truncate">{song.title}</h3>
              <p className="text-gray-500 text-sm">{song.artist}</p>
            </div>
            <div className="mt-4">
               <Button variant="primary" fullWidth size="sm">Play</Button>
            </div>
          </Card>
        )}
      />
    </div>
  );
}
