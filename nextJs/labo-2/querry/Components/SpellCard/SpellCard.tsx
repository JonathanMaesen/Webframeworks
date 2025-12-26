import {Spell} from "@/interfaces";
import styles from './SpellCard.module.css';

export default function SpellCard({spell} : {spell: Spell})  {
    return(
        <div 
            role="button"
            tabIndex={0}
            className={styles.card}
        >
            <div className={`${styles.topBar} ${
                spell.alignment === 'Dark' ? styles.topBarDark : 
                spell.alignment === 'Good' ? styles.topBarGood : 
                styles.topBarNeutral
            }`}></div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>
                        {spell.name}
                    </h3>
                    {spell.mana > 0 && (
                        <span className={styles.manaBubble} title="Mana Cost">
                            {spell.mana}
                        </span>
                    )}
                </div>
                
                <div className={styles.tags}>
                    <span className={`${styles.tag} ${styles.tagType}`}>
                        {spell.type}
                    </span>
                    <span className={`${styles.tag} ${
                         spell.alignment === 'Dark' ? styles.tagDark : 
                         spell.alignment === 'Good' ? styles.tagGood : 
                         styles.tagNeutral
                    }`}>
                        {spell.alignment}
                    </span>
                </div>

                <p className={styles.description}>
                    {spell.description}
                </p>

                <div className={styles.footer}>
                    <span className="font-medium">Diff: <span className={styles.difficultyValue}>{spell.difficulty}</span></span>
                </div>
            </div>
        </div>
    )
}