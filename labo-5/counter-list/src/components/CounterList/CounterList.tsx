import { CounterRow } from "../CounterRow/CounterRow";

type Props = {
    counters: number[];
    onChange: (index: number, amount: number) => void;
};

export function CounterList({ counters, onChange }: Props) {
    if (!counters.length) return <p>No counters yet.</p>;

    return (
        <div style={{ display: "grid", gap: 8 }}>
            {counters.map((count, i) => (
                <CounterRow
                    key={i}
                    count={count}
                    onIncrement={() => onChange(i, +1)}
                    onDecrement={() => onChange(i, -1)}
                />
            ))}
        </div>
    );
}
