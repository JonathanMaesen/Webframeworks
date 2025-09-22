import TextInput from "../TextInput/TextInput.tsx";


function TextInputRepeater(cellCount : {cellCount: number}) {
    const RowArray: number[] = [];
    for (let i = 1; i <= cellCount.cellCount; i++) {
        RowArray.push(i);
    }

    return(
        <tr>
            {RowArray.map((position, i) => (
                <td key={i}>
                    <TextInput position={position} />
                </td>
            ))}
        </tr>
    )
}

export default TextInputRepeater