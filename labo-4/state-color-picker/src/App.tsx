// @ts-ignore
import './App.css';
import {useState} from "react";

function App() {
    const [Colors, setColors] = useState<string[]>([])

    const ColorChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const selectedColor : string = event.target.value;
        const tempColorArray: string[] = [...Colors].filter((i) => i !== selectedColor);
        setColors(tempColorArray)
    }
    return (
        <>
            <input type="color" onChange={ColorChange}/>
            <p> you picked the color: {Colors}</p>
        </>
    );
}

export default App;
