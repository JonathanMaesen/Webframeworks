import {useState} from "react";

export const Counter = () => {
    const [Counter, setCounter] = useState<number>(0)

    // @ts-ignore
    const increaseCounter = () =>{
        setCounter(Counter + 1)
    }
    // @ts-ignore
    const decreaseCounter = () =>{
        setCounter(Counter - 1)
    }
    const CounterPositiveOrNegative = () => {
        if (Counter === 0) {
            return { color: "black" };
        } else if (Counter < 0) {
            return { color: "red" };
        }else {
            return { color: "green" };
        }
    };

    return (
        <>
            <div>
            <p style={CounterPositiveOrNegative()}>{Counter}</p>
            <button onClick={increaseCounter}>up</button>
            <button onClick={decreaseCounter}>down</button>
            </div>
        </>
    )
}