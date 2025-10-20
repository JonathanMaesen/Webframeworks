import { useEffect,useState } from "react";

interface TimerProps {
    interval: number
}

const Timer = ({interval} : TimerProps) => {
    const [number, setNumber] = useState(0);
    useEffect(() => {
        let handle = setInterval(() => {
            setNumber(number => number + 1);
        },interval);

        return () => {
            clearInterval(handle);
        }
    },[interval]);

    return <p>{number}</p>
}


const App = () => {
    const [timerInterval, setTimerInterval] = useState(1000);
    return (
        <>
            <div>
                <input type="range" min="1" max="2000" value={timerInterval} onChange={(e) => setTimerInterval(parseInt(e.target.value))}/>
                <label htmlFor="volume">{timerInterval}</label>
            </div>
            <Timer interval={timerInterval} />
        </>
    );
}

export default App;