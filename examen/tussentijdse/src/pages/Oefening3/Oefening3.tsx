import {useEffect, useState} from "react";


export const Oefenign3 = () => {
    const [startTimer, setStartTimer] = useState<number>(10000000000)
    const [number, setNumber] = useState(0);
    //dit probeerde ik dus. DIt geeft een error, ik kan er niet aan uit :((((
    // const [barColor, setBarColor] = useState<CSS.BackgroundColor>("green")
    useEffect(() => {
        let handle = setInterval(() => {
            setNumber(number => number + 1);}, startTimer);
            return () => {
                clearInterval(handle);
            }
        }, [startTimer]);
    if (number >= 50){
       // setBarColor("orange")
    }
    if (number >= 75){
      //  setBarColor("red")
    }
    return (
        <>
            <div>
                <div
                    style={{
                        height: 16,
                        width: "100%",
                        background: "grey",
                        overflow: "hidden",
                        border: "1px solid #ddd",
                    }}
                    aria-label="Progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={number}
                    role="progressbar"
                >
                    <div
                        style={{
                            height: "100%",
                            width: `${number}%`,
                            // Dit is frustrerend. ik probeerde de backrgound color zo aan te passen,maar blijkbaar moet dat met een of ander speciaal referentie css type
                           // background: {barColor},
                            background: "green",
                            transition: "width 20ms ease",
                        }}
                    />
                </div>
                {/*knop die verwisselt van start naar stop is met een ternary operator gedaan, maar ik heb niet genoeg tijd om het te implementeren.
                Ik ben niet geheel zeker hoe je de timer volledig stopt... beetje akward, maar helaas pindakaas. */}
                <button onClick={() => setStartTimer(100)}>start</button>
                <button onClick={() => setStartTimer(1000000)}>stop</button>


            </div>
            {number}
        </>
    )
}
