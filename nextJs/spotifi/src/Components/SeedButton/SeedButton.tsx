"use client";

import { seedDatabase } from "@/database/seedAction";
import { useState } from "react";
import Button from "@/Components/Button/Button";

export default function SeedButton() {
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        if (!confirm("Are you sure you want to reset the database? This will delete all existing songs.")) {
            return;
        }

        setLoading(true);
        try {
            const result = await seedDatabase();
            alert(result.message);
        } catch (error) {
            alert("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleSeed}
            isLoading={loading}
            variant="danger"
            size="small"
        >
            Reset DB
        </Button>
    );
}