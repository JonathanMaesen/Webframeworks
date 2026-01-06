"use client";

import { useState } from "react";
import { buySongAction } from "@/database/actions/purchaseAction";
import { useRouter } from "next/navigation";
import Button from "@/Components/Button/Button";

interface BuyButtonProps {
    songId: number;
    price: number;
    userId: number | null;
    isOwned: boolean;
}

export default function BuyButton({ songId, price, userId, isOwned }: BuyButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleBuy = async () => {
        if (!userId) {
            router.push("/login");
            return;
        }

        if (!confirm(`Buy this song for ${price} credits?`)) {
            return;
        }

        setLoading(true);
        try {
            const result = await buySongAction(userId, songId);
            if (result.success) {
                alert("Purchase successful!");
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (isOwned) {
        return (
            <Button variant="outline" disabled style={{ borderColor: 'var(--essential-positive)', color: 'var(--essential-positive)' }}>
                Owned
            </Button>
        );
    }

    return (
        <Button 
            onClick={handleBuy} 
            isLoading={loading}
        >
            Buy for {price} Credits
        </Button>
    );
}