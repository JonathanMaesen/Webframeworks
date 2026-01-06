import { getDb } from "./client";

interface Counter {
    _id: string;
    seq: number;
}

export async function getNextSequence(name: string): Promise<number> {
    const db = await getDb();
    const collection = db.collection<Counter>("counters");
    
    const result = await collection.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: "after" }
    );
    
    if (!result) {
        throw new Error("Failed to generate sequence");
    }

    return result.seq;
}