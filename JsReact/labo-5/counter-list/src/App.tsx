import { useState } from "react";

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
            <div> total value: {total}</div>
            {counters.map((counter, id) => {
                let color: string = "black"
                if (counter === 0){
                    color = "black"
                }
                else if (counter > 0)
                {
                    color = "green"
                }
                else
                {
                    color = "red"
                }
                return(
                    <div key={id} style={{display: "flex", gap: "15px"}}>
                        <button onClick={() => changeCounter(id, +1)}>Increase</button>
                        <div style={{color : color}}>{counter}</div>
                        <button onClick={() => changeCounter(id, -1)}>Decrease</button>
                    </div>
                )
            })}
            <button onClick={addCounter}>➕ Add Counter</button>
        </div>
    );
}
