import Link from 'next/link';
import styles from './NavBar.module.css';

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    HP Spells
                </Link>
                
                <div className={styles.links}>
                    <Link href="/search" className={styles.link}>Search</Link>
                    <Link href="/paging" className={styles.link}>Paging</Link>
                    <Link href="/sorting" className={styles.link}>Sorting</Link>
                </div>
            </div>
        </nav>
    );
}