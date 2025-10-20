// @ts-ignore
import './App.css';
import penguins from "../Data/Data.ts"
import type {penguin} from "./interfaces.ts";
import {Card} from "./components/card/card.tsx";
import {useState} from "react";
function App() {

    // @ts-ignore
    const [AllPengus, setAllPengus] = useState<penguin[]>(penguins);
    const [SelectedPengus, setSelectedPengus] = useState<boolean[]>(Array(penguins.length).fill(false));

    const SelectPenguin = (index: number) => {
        const tempArray = [...SelectedPengus];

        tempArray[index] = !tempArray[index];
        setSelectedPengus(tempArray)
    }

    return (
        <>
            <div className={"CardContainer"}>
            {
                AllPengus.filter((AllPengus) =>
                    AllPengus.gender === "Female").map(
                        (penguin, index) => {
                            return <div onClick={() =>
                                SelectPenguin(index)}
                                        key={penguin.id}
                                        className={`card-outer ${SelectedPengus[index] ? "selected" : ""}`}>
                                <Card penguin={penguin} />
                            </div>
                        })
            }
            </div>
        </>
    );
}

export default App;
