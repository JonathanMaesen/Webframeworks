"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
    placeholder?: string;
    queryKey?: string;
}

export default function SearchInput({ 
    placeholder = "Search for songs...", 
    queryKey = "q" 
}: SearchInputProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set(queryKey, term);
        } else {
            params.delete(queryKey);
        }
        params.set("page", "1");
        
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                placeholder={placeholder}
                defaultValue={searchParams.get(queryKey)?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}