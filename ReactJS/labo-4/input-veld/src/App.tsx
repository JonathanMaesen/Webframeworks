// @ts-ignore
import './App.css';
import {useState} from "react";

function App() {
    let [inputField, setInputField] = useState<string>("")
    return (
        <>
            <input type="text" placeholder={inputField} onChange={(e) => (setInputField(e.currentTarget.value))}/>
            <input type="text" placeholder={inputField} onChange={(e) => (setInputField(e.currentTarget.value))}/>
            <input type="text" placeholder={inputField} onChange={(e) => (setInputField(e.currentTarget.value))}/>
            <input type="text" placeholder={inputField} onChange={(e) => (setInputField(e.currentTarget.value))}/>

        </>
    );
}

export default App;
