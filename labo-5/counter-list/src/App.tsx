import { useState } from "react";
import { Total } from "./components/Total/Total.tsx";
import { CounterList } from "./components/CounterList/CounterList.tsx";

export default function App() {
    const [counters, setCounters] = useState<number[]>([0]);

    const addCounter = () => setCounters([...counters, 0]);

    const changeCounter = (index: number, amount: number) => {
        const next = [...counters];
        next[index] += amount;
        setCounters(next);
    };

    const total = counters.reduce((sum, n) => sum + n, 0);

    return (
        <div style={{ padding: 20, display: "grid", gap: 12 }}>
            <button onClick={addCounter}>➕ Add Counter</button>
            <Total value={total} />
            <CounterList counters={counters} onChange={changeCounter} />
        </div>
    );
}
