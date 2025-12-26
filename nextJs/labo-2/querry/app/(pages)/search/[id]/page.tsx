"use client"
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { Spell } from "@/interfaces";
import styles from './spell.module.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SpellPage() {
    const params = useParams();
    const id = params.id;

    const { data, error, isLoading } = useSWR<Spell[]>('https://sampleapis.assimilate.be/harrypotter/spells', fetcher);

    if (error) return (
        <div className={styles.centerContainer}>
            <div className={styles.errorText}>Failed to load spell data.</div>
        </div>
    );
    
    if (isLoading) return (
        <div className={styles.centerContainer}>
            <div className={styles.loadingText}>Summoning spell details...</div>
        </div>
    );

    const spell = data?.find((s) => s.id.toString() === id);

    if (!spell) {
        return (
            <div className={styles.centerContainer}>
                <div className={styles.notFoundText}>Spell not found in the grimoire.</div>
            </div>
        );
    }

    const getDifficultyBadgeClass = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return styles.badgeBeginner;
            case 'Intermediate': return styles.badgeIntermediate;
            case 'Advanced': return styles.badgeAdvanced;
            default: return styles.badgeExpert;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{spell.name}</h1>
                    <p className={styles.subtitle}>{spell.type}</p>
                </div>
                
                <div className={styles.content}>
                    <div className={styles.descriptionSection}>
                        <h2 className={styles.sectionTitle}>Description</h2>
                        <p className={styles.descriptionText}>{spell.description}</p>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.statBox}>
                            <span className={styles.statLabel}>Difficulty</span>
                            <span className={`${styles.badge} ${getDifficultyBadgeClass(spell.difficulty)}`}>
                                {spell.difficulty}
                            </span>
                        </div>

                        <div className={styles.statBox}>
                            <span className={styles.statLabel}>Mana Cost</span>
                            <span className={styles.statValue}>{spell.mana}</span>
                        </div>

                        <div className={styles.statBox}>
                            <span className={styles.statLabel}>Effect Duration</span>
                            <span className={styles.statValue}>{spell.effectDuration}</span>
                        </div>

                        <div className={styles.statBox}>
                            <span className={styles.statLabel}>Range</span>
                            <span className={styles.statValue}>{spell.range}</span>
                        </div>
                    </div>
                    
                    {spell.isUnforgivable && (
                        <div className={styles.warningBox}>
                            <p className={styles.warningText}>
                                Warning: This is an <strong>Unforgivable Curse</strong>. Use with extreme caution.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}