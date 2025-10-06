import './App.css';
import {Slotmachine} from "./components/slotmachine/Slotmachine.tsx";

function App() {

    return (
        <>
            <h1>Labo 1: Slots</h1>
            <Slotmachine slotCount={3}/>
        </>
    );
}

export default App;