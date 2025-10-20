import './App.css';
import {ChangeEvent, useState} from "react";

interface Joske {
    name: string;
    baseName: string;
    color: string;
    emotion: string;
    isCircle: boolean;
}


const ColorSquare = () => {
    let [joske, setJoske] = useState<Joske>({
        name: "joske",
        baseName: "joske",
        color: "red",
        emotion: ":(",
        isCircle : false
    })

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setJoske(prev => ({ ...prev, [name]: value }));
    }
    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <p><b>{joske.name}</b></p>
                <div className="square" style={{backgroundColor: joske.color, borderRadius: joske.isCircle ? "100px" : "0"}}>
                    <p>{joske.emotion}</p>
                </div>
                <input
                    name="name"
                    type="text" value={joske.name}
                    onChange={handleChange}
                />
                <button
                    onClick={() => setJoske(prevState => ({...prevState, name: prevState.baseName}))}>Reset name</button>
                <select
                    name="emotion"
                    value={joske.emotion}
                    onChange={handleChange}
                >
                    <option value=":(">:(</option>
                    <option value=":)">:)</option>
                    <option value=">:(">{'>:('}</option>
                </select>
                <label>is round</label>
                <input
                    type="checkbox"
                    checked={joske.isCircle}
                    onChange={(e) => setJoske(prev => ({
                        ...prev,
                        isCircle: e.target.checked
                    }))}
                />
            </div>
        </>
    )
}

const App = () => {
    return <ColorSquare/>
}

export default App;