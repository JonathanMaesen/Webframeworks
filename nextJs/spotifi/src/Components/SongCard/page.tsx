import { Song } from "@/database/types";
import styles from "./SongCard.module.css";
import Link from "next/link";

interface SongCardProps {
    song: Song;
}

export default function SongCard({ song }: SongCardProps) {
    return (
        <Link href={`/home/${song.id}`} style={{ textDecoration: 'none' }}>
            <div className={styles.card}>
                <img
                    src={song.thumbnail}
                    alt={song.title}
                    className={styles.thumbnail}
                />
                <div>
                    <h3 className={styles.songTitle}>{song.title}</h3>
                    <p className={styles.songArtist}>{song.description}</p>
                </div>
                <div className={styles.meta}>
                    <span>{song.more_information.genre}</span>
                    <span className={styles.price}>
                        {song.owned ? (
                            <span style={{ color: 'var(--essential-positive)' }}>Owned</span>
                        ) : (
                            `${song.credits} Credits`
                        )}
                    </span>
                </div>
            </div>
        </Link>
    );
}