import { getUserLibrary } from "@/database/songs";
import { getSession } from "@/lib/auth";
import styles from "./page.module.css";
import SongCard from "@/Components/SongCard/page";
import Link from "next/link";
import { Song } from "@/database/types";

export default async function Library() {
    const session = await getSession();
    const userId = session?.id;

    if (!userId) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Your Library</h1>
                <div className={styles.emptyState}>
                    <p>Please <Link href="/login" className={styles.loginLink}>log in</Link> to view your library.</p>
                </div>
            </div>
        );
    }

    const songs = await getUserLibrary(userId);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Library</h1>

            {songs.length > 0 ? (
                <div className={styles.grid}>
                    {songs.map((song: Song) => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>Your library is empty.</p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Go to the <Link href="/home" className={styles.loginLink}>Home</Link> page to discover music!
                    </p>
                </div>
            )}
        </div>
    );
}