import './App.css'

function Add(num1 :number, num2:number){
    return num1 + num2
}

function App() {
    let random: number = Math.random();
    let num1 : number = Math.floor(Math.random() * 9)
    let num2 : number = Math.floor(Math.random() * 9)

    return (
        <div>
            <h1>Labo 1</h1>
            <h2>Random getal {random * 10}</h2>
            <h2>Random getal floor {Math.floor(random * 10)}</h2>
            <h2>{num1}, {num2}</h2>
            <h2>{Add(num1, num2)}</h2>
        </div>
    );
}

export default App
