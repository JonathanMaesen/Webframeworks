"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "./SortSelect.module.css";

export default function SortSelect() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentSort = searchParams.get("sort") || "title";
    const currentDir = searchParams.get("dir") || "asc";

    const handleSortChange = (value: string) => {
        const [sort, dir] = value.split("-");
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sort);
        params.set("dir", dir);
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={styles.container}>
            <select
                className={styles.select}
                value={`${currentSort}-${currentDir}`}
                onChange={(e) => handleSortChange(e.target.value)}
            >
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="publish_date-desc">Newest First</option>
                <option value="publish_date-asc">Oldest First</option>
                <option value="owned-desc">Owned First</option>
            </select>
        </div>
    );
}