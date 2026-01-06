"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface SortOption {
  label: string;
  value: string;
}

interface SortSelectProps {
  options: SortOption[];
}

export function SortSelect({ options }: SortSelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSort = searchParams.get("sort") || "";
  const currentOrder = searchParams.get("order") || "asc";

  function handleSortChange(sort: string) {
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function toggleOrder() {
    const params = new URLSearchParams(searchParams);
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    params.set("order", newOrder);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      >
        <option value="">Default Sort</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <button
        onClick={toggleOrder}
        className="h-10 w-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        title={currentOrder === "asc" ? "Ascending" : "Descending"}
      >
        {currentOrder === "asc" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h4"/><path d="M11 8h7"/><path d="M11 12h10"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4v16"/><path d="M3 8l4-4 4 4"/><path d="M11 12h10"/><path d="M11 16h7"/><path d="M11 20h4"/></svg>
        )}
      </button>
    </div>
  );
}
