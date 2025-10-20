import * as React from "react";
import {useCallback, useState} from "react";

export function ColorSquare() {
    let [colorSquare, setColorSquare] = useState<string>("");

    const onSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setColorSquare(event.target.value)
    }, []);

    let colors: string[] = ["white","yellow", "green", "black", "orange", "red", "blue"];
    return (
        <>
            <select name="ColorSelector" onSelect={onSelectChange} onChange={onSelectChange}>
                {colors.map((color, index) => (
                    <option key={index} value={color}>
                        {color}
                    </option>
                ))}
            </select>
            <div style={{backgroundColor: colorSquare, width: "100px", height: "100px"}}></div>
        </>
    );
}