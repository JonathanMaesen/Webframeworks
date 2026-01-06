import { getSongs } from "@/database/songs";
import { SortDirection, SortField } from "@/database/types";
import { getSession } from "@/lib/auth";
import styles from "./page.module.css";
import SongCard from "@/Components/SongCard/page";
import SearchInput from "@/Components/SearchInput/SearchInput";
import SeedButton from "@/Components/SeedButton/SeedButton";
import Pagination from "@/Components/Pagination/Pagination";
import SortSelect from "@/Components/SortSelect/SortSelect";
import { Suspense } from "react";

interface HomeProps {
    searchParams: Promise<{
        q?: string;
        sort?: SortField;
        dir?: SortDirection;
        page?: string;
    }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const params = await searchParams;
    const q = params.q || "";
    const sortField = params.sort || "title";
    const sortDirection = params.dir || "asc";
    const page = parseInt(params.page || "1");

    const session = await getSession();
    const userId = session?.id ?? null;

    const { songs, pages } = await getSongs(userId, q, sortField, sortDirection, page);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>All Songs</h1>
                <div className={styles.actions}>
                    <SeedButton />
                    <SortSelect />
                    <SearchInput />
                </div>
            </div>
            
            <Suspense fallback={<div className={styles.loading}>Loading songs...</div>}>
                <div className={styles.grid}>
                    {songs.map((song) => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            </Suspense>
            
            {songs.length === 0 && (
                <p className={styles.emptyState}>No songs found.</p>
            )}

            <Pagination totalPages={pages} />
        </div>
    );
}