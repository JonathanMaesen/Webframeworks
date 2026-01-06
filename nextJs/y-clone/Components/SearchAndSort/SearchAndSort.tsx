"use client"
import { ChangeEvent } from "react";

interface SearchAndSortProps {
    searchTerm: string;
    sortOption: string;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SearchAndSort({ searchTerm, sortOption, onSearchChange, onSortChange }: SearchAndSortProps) {
    return (
        <div className="flex gap-4 mb-4">
            <input
                type="text"
                placeholder="Search Tweets..."
                value={searchTerm}
                onChange={onSearchChange}
                className="border p-2 rounded"
            />
            <select
                value={sortOption}
                onChange={onSortChange}
                className="border p-2 rounded"
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most_liked">Most Liked</option>
            </select>
        </div>
    );
}