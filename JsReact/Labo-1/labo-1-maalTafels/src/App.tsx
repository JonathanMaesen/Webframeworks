import './App.css'

let initialArray: number[][] = [];
let counter :number = 0;
for (let i: number = 1; i <11; i++) {
    initialArray[i] = [];
    for (let j: number = 1; j < 11; j++) {
        initialArray[i][j] = i * j;
    }
    counter++
}
function App() {
    console.log(initialArray)
  return (
    <>
        <div>
            <h1>Multiplication Table</h1>
            <table>
                <tbody>
                {initialArray.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cell, colIndex) => (
                            <td key={`cell-${rowIndex}-${colIndex}`}>{cell}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default App
