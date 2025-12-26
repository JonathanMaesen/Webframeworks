"use client";
import useSWR from 'swr';
import Link from "next/link";
import styles from './search.module.css';
import { Spell, SortDirection } from "@/interfaces";
import SpellCard from "@/Components/SpellCard/SpellCard";
import {useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useEffect, useState} from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());
const ITEMS_PER_PAGE = 5;

export default function SearchPage() {
    const { data, error } = useSWR<Spell[]>('https://sampleapis.assimilate.be/harrypotter/spells', fetcher);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const query = searchParams.get('query') || '';
    const sort = (searchParams.get('sort') as SortDirection) || 'asc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const [searchTerm, setSearchTerm] = useState(query);
    const [sortDirection, setSortDirection] = useState<SortDirection>(sort);
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        setSearchTerm(query);
        setSortDirection(sort);
        setCurrentPage(page);
    }, [query, sort, page]);

    if (!data) return <div className={styles.loading}>Loading spells...</div>;
    if (error) return <div className={styles.error}>Error: {error.message}</div>;

    const filteredSpells = data
        .filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

    const totalPages = Math.ceil(filteredSpells.length / ITEMS_PER_PAGE);
    const paginatedSpells = filteredSpells.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const updateParams = (newQuery: string, newSort: SortDirection, newPage: number) => {
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

        router.push(`/search?${params.toString()}`);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        updateParams(term, sortDirection, 1);
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value as SortDirection;
        setSortDirection(newSort);
        updateParams(searchTerm, newSort, currentPage);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        updateParams(searchTerm, sortDirection, newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Spell Collection</h1>
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search spells..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
                <select 
                    value={sortDirection} 
                    onChange={handleSortChange}
                    className={styles.sortSelect}
                >
                    <option value="asc">Name (A-Z)</option>
                    <option value="desc">Name (Z-A)</option>
                </select>
            </div>
            
            <div className={styles.grid}>
                {paginatedSpells.map((spell) => (
                    <Link key={spell.id} href={`/search/${spell.id}`} className={styles.cardLink}>
                        <SpellCard spell={spell}/>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={styles.pageButton}
                    >
                        Previous
                    </button>
                    <span className={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={styles.pageButton}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}