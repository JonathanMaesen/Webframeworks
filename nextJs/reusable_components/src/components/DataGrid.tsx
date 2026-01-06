import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface DataGridProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  page: number;
  totalPages: number;
  baseUrl: string;
}

export function DataGrid<T extends { _id: any }>({ 
  data, 
  renderItem, 
  page, 
  totalPages,
  baseUrl 
}: DataGridProps<T>) {
  
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No items found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <div key={item._id.toString()}>
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Link 
          href={page > 1 ? `${baseUrl}?page=${page - 1}` : "#"}
          className={page <= 1 ? "pointer-events-none opacity-50" : ""}
        >
          <Button variant="secondary" disabled={page <= 1}>
            Previous
          </Button>
        </Link>
        
        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>

        <Link 
          href={page < totalPages ? `${baseUrl}?page=${page + 1}` : "#"}
          className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
        >
          <Button variant="secondary" disabled={page >= totalPages}>
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}
