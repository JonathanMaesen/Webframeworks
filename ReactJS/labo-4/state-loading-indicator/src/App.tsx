// @ts-ignore
import './App.css';
import {useState} from "react";

function App() {
    const [Loading, setLoading] = useState<boolean>(false)

    const handleChange: React.MouseEventHandler<HTMLButtonElement> = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);

    }
    return (
        <>
            <button onClick={handleChange}>
                {Loading ? "Loading..." : "Start loading the end of the world"}
            </button>
        </>
    );
}

export default App;
