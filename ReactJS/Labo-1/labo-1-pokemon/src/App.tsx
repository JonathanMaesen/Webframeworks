import './App.css'
import type { Pokemon } from "./data.ts"
import { pokemons } from "./data.ts"

const pokeDex : Pokemon[] = pokemons;

function App() {
    let random = Math.random() * (pokeDex.length + 1)
    function handleClick() {
        alert("Button clicked!");
    }

    return (
    <>
        <button onClick={handleClick}>Click me</button>
    </>
  )
}

export default App
