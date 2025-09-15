import './App.css'

// Import images properly
import seven from './assets/slot-seven.png';
import prune from './assets/slot-prune.png';
import melon from './assets/slot-melon.png';
import lemon from './assets/slot-lemon.png';
import cherry from './assets/slot-cherry.png';

function getResultMessage(slot1: number, slot2: number, slot3: number): string {
    if (slot1 === slot2 && slot1 === slot3) {
        return "You win!";
    } else {
        return "Try again";
    }
}

function fruitPicker(nr: number): string {
    switch (nr) {
        case 0: return seven;
        case 1: return prune;
        case 2: return melon;
        case 3: return lemon;
        case 4: return cherry;
        default: return "";
    }
}

function App() {
    const slot1: number = Math.floor(Math.random() * 5); // 0–4
    const slot2: number = Math.floor(Math.random() * 5);
    const slot3: number = Math.floor(Math.random() * 5);

    return (
        <>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Slot 1</th>
                        <th>Slot 2</th>
                        <th>Slot 3</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><img src={fruitPicker(slot1)} alt="Slot1" /></td>
                        <td><img src={fruitPicker(slot2)} alt="Slot2" /></td>
                        <td><img src={fruitPicker(slot3)} alt="Slot3" /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h1>{getResultMessage(slot1, slot2, slot3)}</h1>
            </div>
        </>
    );
}

export default App;
