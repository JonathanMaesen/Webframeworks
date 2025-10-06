type Props = {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

export function CounterRow({ count, onIncrement, onDecrement }: Props) {
    return (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={onDecrement}>Omlaag</button>
            <p style={{ margin: 0 }}>Count: {count}</p>
            <button onClick={onIncrement}>Omhoog</button>
        </div>
    );
}
