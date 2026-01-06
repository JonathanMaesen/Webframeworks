import { getSongById } from "@/database/songs";
import { getSession } from "@/lib/auth";
import styles from "./page.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyButton from "@/Components/BuyButton/BuyButton";
import PlayButton from "@/Components/PlayButton/PlayButton";

interface SongDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function SongDetails({ params }: SongDetailsProps) {
    const { id } = await params;
    const songId = parseInt(id);

    if (isNaN(songId)) {
        notFound();
    }

    const session = await getSession();
    const userId = session?.id ?? null;

    const song = await getSongById(songId, userId);

    if (!song) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Link href="/home" className={styles.backLink}>
                &larr; Back to Home
            </Link>

            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img 
                        src={song.thumbnail} 
                        alt={song.title} 
                        className={styles.image} 
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.type}>{song.more_information.type}</div>
                    <h1 className={styles.title}>{song.title}</h1>
                    <p className={styles.description}>{song.description}</p>

                    <div className={styles.meta}>
                        <div className={styles.metaRow}>
                            <span className={styles.label}>Genre:</span>
                            <span>{song.more_information.genre}</span>
                        </div>
                        <div className={styles.metaRow}>
                            <span className={styles.label}>Released:</span>
                            <span>{new Date(song.more_information.publish_date).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <PlayButton />
                        
                        <BuyButton 
                            songId={song.id} 
                            price={song.credits} 
                            userId={userId} 
                            isOwned={!!song.owned} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}