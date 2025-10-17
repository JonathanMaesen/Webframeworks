import React, {useState} from "react";

type CounterProps = {
    value: number,
    index: number,
    onIncrease: (index: number) => void,
    onDecrease: (index: number) => void,
    key?: number
};

const Counter: React.FC<CounterProps> = ({value, index, onIncrease, onDecrease, key}) => {
    let color = "black";
    if (value > 0) color = "green";
    else if (value < 0) color = "red";

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
            }}
        >
            <button onClick={() => onDecrease(index)}>Omlaag</button>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: color,
                }}
            >
                Count: {value}
            </div>

            <button onClick={() => onIncrease(index)}>Omhoog</button>
        </div>
    );
};

const CounterList: React.FC = () => {
    const [counters, setCounters] = useState<number[]>([]);

    const addCounter = () => {
        setCounters([...counters, 0]);
    };

    const increaseCounter = (index: number) => {
        setCounters(prev =>
            prev.map((counter, i) => (i === index ? counter + 1 : counter))
        );
    };

    const decreaseCounter = (index: number) => {
        setCounters(prev =>
            prev.map((counter, i) => (i === index ? counter - 1 : counter))
        );
    };

    const total = counters.reduce((sum, n) => sum + n, 0);

    return (
        <>
            {counters.map((value, index) => (
                <Counter
                    key={index}
                    value={value}
                    index={index}
                    onIncrease={increaseCounter}
                    onDecrease={decreaseCounter}
                />
            ))}

            <p>Som van de tellers: {total}</p>
            <button onClick={addCounter}>Voeg teller toe</button>
        </>
    );
};

export default function App() {
    return (
        <>
            <CounterList/>
        </>
    )
}
