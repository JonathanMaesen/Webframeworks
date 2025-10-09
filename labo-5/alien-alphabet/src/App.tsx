import { useEffect, useState } from "react";
import "./App.css";
import { loadJson } from "../data/Data";

interface Letter {
    human: string;
    alien: string
}

interface AlienAlphabet {
    letters: Letter[];
}

export default function App() {
    const [alphabet, setAlphabet] = useState<AlienAlphabet>();
    const [chosenLetters, setChosenLetters] = useState<Letter[]>([]);
    useEffect(() => {
        loadJson<AlienAlphabet>(
            "https://raw.githubusercontent.com/slimmii/alien-alphabet/master/alien.json"
        )
            .then(setAlphabet)
    }, []);

    if (!alphabet) return <div>Loading…</div>;

    const AddLetter = (item: Letter) => {
      setChosenLetters((prevState) => [...prevState, item])
    }
    const Clear = () => {
      setChosenLetters([])
    }
    const Backspace = () => {
        setChosenLetters(prev => prev.slice(0, -1));
    }
    const Remove = (index: number) => {
        setChosenLetters(prev => prev.filter((_, i) => i !== index));
    };


    return (
        <>
            <div>
                <h3>Controls</h3>
                <button onClick={Clear}>Clear</button>
                <button onClick={Backspace}>Backspace</button>
            </div>
            <div>
                {alphabet.letters.map((letter, i) => (
                    <button key={i} onClick={() => AddLetter(letter)}>
                        <img src={letter.alien} alt={letter.human} /> = {letter.human}
                    </button>
                ))}
            </div>
            <div>
                {chosenLetters.map((letter, i) => (
                    <button key={i}> <img src={letter.alien} alt={letter.human} onClick={() => Remove(i)}/> = {letter.human}
                    </button>
                ))}
            </div>
        </>
    );
}
