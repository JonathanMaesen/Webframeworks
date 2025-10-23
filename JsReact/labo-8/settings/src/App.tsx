import './App.css';
import {createContext} from "react";

interface SettingsContext {
    color: string
}

const SettingsContext = createContext<SettingsContext>({color: "blue"})

function Square() {

    
}
function App() {
    return (
        <>
        </>
    );
}

export default App;
