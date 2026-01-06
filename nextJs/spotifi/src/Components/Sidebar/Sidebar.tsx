import styles from "./Sidebar.module.css";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/database/auth/auth";
import { logout } from "@/database/auth/authActions";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Button from "@/Components/Button/Button";

export default async function Sidebar() {
    const session = await getSession();
    let user = null;

    if (session?.id) {
        user = await findUserById(session.id);
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span style={{ color: 'var(--essential-bright-accent)' }}>●</span> Spotifi
            </div>

            <NavLinks />

            {user && (
                <div className={styles.userSection}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.userName}>
                            {user.name}
                        </div>
                    </div>
                    
                    <div className={styles.wallet}>
                        <span className={styles.walletLabel}>Wallet</span>
                        <span className={styles.credits}>{user.credits} CR</span>
                    </div>

                    <form action={logout}>
                        <Button type="submit" variant="outline" fullWidth size="small">
                            Logout
                        </Button>
                    </form>
                </div>
            )}
            
            {!user && (
                <div className={styles.userSection}>
                    <Link href="/login" className={styles.link}>
                        Log In
                    </Link>
                </div>
            )}
        </aside>
    );
}