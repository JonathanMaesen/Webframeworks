import {rainbow} from "rainbow-colors-array-ts";
import {useState} from "react";


export const Oefening1 = () => {
    const [selectedBoxes, setSelectedBoxes] = useState<string[]>([])

    //ik heb al veel te veel tijd verbrot aan deze oefening, ik weet hoe ik verder moet, een click handler schrijven, en dan een paar knopjes toevoegen met een remove.
    function SelectedBox() {
        return(
            <>
                <div style={{display:"flex", flexWrap:"wrap", border: "1px solid black", height: "120px", width: "300px"}}>
                    {selectedBoxes.map((color, index   ) => (
                        <div key={index} style={{backgroundColor: color, height: "20px", width: "20px"}}
                        >

                        </div>
                        )
                    )}
                </div>
            </>
        )
    }
    function RainbowContainer() {
        return (
            <div style={{display: "flex", flexDirection: "row", alignItems: "flex-start"}}>
                <SelectedBox/>
                <div style= {{display: "flex", flexWrap: "wrap"}}>
                    {
                        rainbow(100, "hex", false).map(
                            (rainbow, index) =>(
                                <div key={index} style={{
                                    backgroundColor: rainbow.hex,
                                    cursor: "pointer",
                                    height: "10px",
                                    width: "10px",
                                    padding: "10px",
                                    margin: "5px"
                                }} onClick={()=>setSelectedBoxes([...selectedBoxes, rainbow.hex])}
                                ></div>))}
                </div>

            </div>
        )
    }
    return (
        <>
            <h3>Oefening: 1</h3>
            <RainbowContainer/>
        </>
    );
}