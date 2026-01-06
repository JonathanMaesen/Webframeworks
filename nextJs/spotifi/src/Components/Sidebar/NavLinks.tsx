"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function NavLinks() {
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/home" },
        { name: "Store", href: "/store" },
        { name: "Library", href: "/library" },
    ];

    return (
        <nav className={styles.nav}>
            {links.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`${styles.link} ${isActive ? styles.active : ""}`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}