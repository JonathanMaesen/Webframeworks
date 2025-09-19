interface prop{
    amount: Number
}

function MultiplicationTable({amount}:prop) {
    let initialArray: number[][] = [];
    for (let i: number = 1; i <amount + 1; i++) {
        initialArray[i] = [];
        for (let j: number = 1; j < amount + 1; j++) {
            initialArray[i][j] = i * j;
        }
    }
    return (
        <div>
            <table style={{border: "2px solid black"}}>
                <tbody>
                    {initialArray.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`} >
                            {row.map((cell, colIndex) => (
                                <td  key={`cell-${rowIndex}-${colIndex}`} style={{border: "2px solid black",padding: "1rem"}} > {cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MultiplicationTable