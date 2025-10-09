import './App.css';
import {SlotMachine} from "./components/slotmachine/Slotmachine.tsx";

function App() {

    return (
        <>
            <h1>Labo 1: Slots</h1>
            <SlotMachine slotCount={3}/>
        </>
    );
}

export default App;