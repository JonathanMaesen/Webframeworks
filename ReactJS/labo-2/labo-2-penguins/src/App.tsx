import './App.css';
import penguins from "../Data/Data.ts"
import type {penguin} from "./interfaces.ts";
import {Card} from "./components/card/card.tsx";
const AllPengus: penguin[] = penguins
function App() {

    return (
        <>
            {
                AllPengus.filter((AllPengus) => AllPengus.gender === "Female").map((penguin) => {
                    return <div key={penguin.id} about={"card outer shell"}><Card penguin={penguin} /></div>
                })
            }
        </>
    );
}

export default App;
