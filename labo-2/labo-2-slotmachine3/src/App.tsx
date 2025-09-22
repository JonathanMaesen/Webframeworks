import './App.css';
import {Slotmachine} from "./components/slotmachine/Slotmachine.tsx";

function App() {

    return (
        <>
            <h1>Labo 1: Slots</h1>
            <Slotmachine slotCount={3}/>
            <Slotmachine slotCount={4}/>
            <Slotmachine slotCount={5}/>


        </>
    );
}

export default App;
