"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "./Pagination.module.css";
import Button from "@/Components/Button/Button";

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (page: number) => {
        replace(createPageURL(page));
    };

    if (totalPages <= 1) return null;

    return (
        <div className={styles.container}>
            <Button
                variant="secondary"
                className={styles.pageButton}
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                &lt;
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    variant={page === currentPage ? "primary" : "secondary"}
                    className={styles.pageButton}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="secondary"
                className={styles.pageButton}
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                &gt;
            </Button>
        </div>
    );
}