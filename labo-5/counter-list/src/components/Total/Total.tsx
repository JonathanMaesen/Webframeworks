type Props = { value: number };

export function Total({ value }: Props) {
    return (
        <div style={{ border: "1px solid #ddd", padding: 10 }}>
            <h2>Total: {value}</h2>
        </div>
    );
}
