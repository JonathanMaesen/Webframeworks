import { addCoinsToUser } from "@/database/songs";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import styles from "./page.module.css";
import Button from "@/Components/Button/Button";

export default async function Store() {
    const session = await getSession();
    const userId = session?.id;

    async function buyCredits() {
        "use server";
        if (userId) {
            await addCoinsToUser(userId, 100);
            revalidatePath("/store");
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Store</h1>
            <p style={{ color: 'var(--text-subdued)', marginBottom: '2rem' }}>
                Buy credits to purchase more songs!
            </p>

            <div style={{ 
                backgroundColor: 'var(--background-elevated-base)', 
                padding: '2rem', 
                borderRadius: '0.5rem',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '1rem', color: 'var(--text-base)' }}>Credit Pack</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-subdued)' }}>
                    Get 100 credits for free (Demo)
                </p>
                
                <form action={buyCredits}>
                    <Button type="submit">
                        Get 100 Credits
                    </Button>
                </form>
            </div>
        </div>
    );
}