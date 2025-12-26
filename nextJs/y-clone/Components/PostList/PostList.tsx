"use client"
import { Post } from "@/utils/interfaces/interfaces";
import PostItem from "@/Components/PostItem/PostItem";
import {useSearchParams, useRouter} from "next/navigation";
import {ChangeEvent, useEffect, useState} from "react";

interface PostListProps {
    posts: Post[];
    totalPages: number;
}

export default function PostList({ posts, totalPages }: PostListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const query = searchParams.get('query') || '';
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [searchTerm, setSearchTerm] = useState(query);
    const [sortOption, setSortOption] = useState(sort);
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        setSearchTerm(query);
        setSortOption(sort);
        setCurrentPage(page);
    }, [query, sort, page]);

    const updateParams = (newQuery: string, newSort: string, newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newQuery) {
            params.set('query', newQuery);
        } else {
            params.delete('query');
        }

        if (newSort) {
            params.set('sort', newSort);
        }

        if (newPage > 1) {
            params.set('page', newPage.toString());
        } else {
            params.delete('page');
        }

        router.push(`/home?${params.toString()}`);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        updateParams(term, sortOption, 1);
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        setSortOption(newSort);
        updateParams(searchTerm, newSort, 1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        updateParams(searchTerm, sortOption, newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return(
        <div>
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search Tweets..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2 rounded"
                />
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border p-2 rounded"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most_liked">Most Liked</option>
                </select>
            </div>
            {posts.map((tweet) => (
                <PostItem key={tweet._id} post={tweet} />
            ))}
            {totalPages > 1 && (
                <div className="flex gap-2 mt-4 items-center justify-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}