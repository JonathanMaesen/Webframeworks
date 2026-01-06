"use server";

import { purchaseSong } from "@/database/songs";
import { revalidatePath } from "next/cache";

export async function buySongAction(userId: number, songId: number) {
    const result = await purchaseSong(userId, songId);
    if (result.success) {
        revalidatePath("/home");
        revalidatePath("/library");
        revalidatePath(`/home/${songId}`);
    }
    return result;
}