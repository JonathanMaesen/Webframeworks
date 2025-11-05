import './App.css';
import {createContext, useContext} from "react";

interface SettingsContext {
    color: string,
    setColor: (color: string) => void
}

const SettingsContext = createContext<SettingsContext>(
    {
        color: "red",
        setColor: () => {}
    }
)

function Square() {
const { color } = useContext(SettingsContext);
    return (
        <div style={{width: "100px", height: "100px", margin: "10px", background: color}}></div>
    )
}

function SquareRow(){
    return(
        <div style={{display: "flex"}}>
            <Square/>
            <Square/>
            <Square/>
        </div>
    )
}
function App() {
    return (
        <>
            <SquareRow/>
        </>
    );
}

export default App;
