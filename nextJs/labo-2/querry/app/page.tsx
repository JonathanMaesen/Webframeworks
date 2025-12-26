import styles from './home.module.css';

export default function Home() {
  return (
      <main className={styles.main}>
          <div className={styles.content}>
              <h1 className={styles.title}>
                  Wizarding <span className={styles.highlight}>World</span>
              </h1>
              <p className={styles.subtitle}>
                  Discover spells, enchantments, and magical knowledge.
              </p>
              <div className="pt-4">
                  <a href="/search" className={styles.button}>
                      Start Exploring
                  </a>
              </div>
          </div>
      </main>
  );
}
