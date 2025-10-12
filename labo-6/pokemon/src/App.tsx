import './App.css';
import {useEffect, useState} from "react";
interface PokemonList {
    id: number
    name: string
}
function Pokedex(limit: number) {
    const [limit, setLimit] = useState<number>(0);
    const [pokemonList, setPokemonList] = useState<PokemonList[]>([])
    useEffect(( ) => {
        let ignore = false;
        const fetchFunction = async() => {
            let result = await fetch(`https://pokeapi.co/api/v2/ability/?limit=${limit}`);
            let json = await result.json();
            if (!ignore) {
                setPokemonList(json);
            }
        }
        fetchFunction();
        return () => {
            ignore = true;
        }
    }, [])
    return(
        <>
            {pokemonList.map((item) => (
                <div key={item.id}>
                    {item.name}
                </div>
            ))}
            <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
            />
        </>
    )
}
function App() {

    return (
        <>
        </>
    );
}

export default App;
