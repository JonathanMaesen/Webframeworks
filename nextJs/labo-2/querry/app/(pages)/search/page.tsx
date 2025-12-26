"use client";
import useSWR from 'swr';
import Link from "next/link";
import styles from './search.module.css';
import { Spell, SortDirection } from "@/interfaces";
import SpellCard from "@/Components/SpellCard/SpellCard";
import {useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useEffect, useState} from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SearchPage() {
    const { data, error } = useSWR<Spell[]>('https://sampleapis.assimilate.be/harrypotter/spells', fetcher);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const query = searchParams.get('query') || '';
    const sort = (searchParams.get('sort') as SortDirection) || 'asc';
    
    const [searchTerm, setSearchTerm] = useState(query);
    const [sortDirection, setSortDirection] = useState<SortDirection>(sort);

    useEffect(() => {
        setSearchTerm(query);
        setSortDirection(sort);
    }, [query, sort]);

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

    const updateParams = (newQuery: string, newSort: SortDirection) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (newQuery) {
            params.set('query', newQuery);
        } else {
            params.delete('query');
        }
        
        if (newSort) {
            params.set('sort', newSort);
        }

        router.push(`/search?${params.toString()}`);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        updateParams(term, sortDirection);
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value as SortDirection;
        setSortDirection(newSort);
        updateParams(searchTerm, newSort);
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
                {filteredSpells.map((spell) => (
                    <Link key={spell.id} href={`/search/${spell.id}`} className={styles.cardLink}>
                        <SpellCard spell={spell}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}