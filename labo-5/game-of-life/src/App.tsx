import './App.css';
import {useState} from "react";

const lifeOrDeath = () : boolean => {
    return Math.random() < 0.5;
}



function App() {
    const [lifeGameBoard, setLifeGameBoard] = useState<string[]>([]);

    const [board, setBoard] = useState<boolean[][]>([[]])
    const makeBoard = (width: number, height: number) => {
        for (var i = 0; i < width; i++) {
            setBoard()
        }
    }
    return (
        <>
            <label htmlFor="width">Width</label>
            <input type="number" name={"width"}/>
            <label htmlFor="height"></label>
            <input type="number" name={"height"}/>
            <button>submit</button>
            <div>

            </div>
        </>
    );
}

export default App;
