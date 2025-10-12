import './App.css';
import { useEffect, useState } from "react";

interface Pokemon {
    name: string;
    url: string;
}

function Pokedex() {
    const [limit, setLimit] = useState<number>(0);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        let ignore = false;

        const fetchFunction = async () => {
            const result = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`);
            const json = await result.json();

            if (!ignore && json.results) {
                setPokemonList(json.results);
            }
        };

        if (limit > 0) fetchFunction();

        return () => {
            ignore = true;
        };
    }, [limit]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem("limitInput") as HTMLInputElement;
        const newLimit = Number(input.value);
        setLimit(newLimit);
    };

    return (
        <>
            {pokemonList.map((item, index) => (
                <div key={index}>{item.name}</div>
            ))}

                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="limitInput"
                        placeholder="Number of Pokémon"
                    />
                    <button type="submit">Fetch</button>
                </form>
        </>
    );
}

function App() {
    return <Pokedex />;
}

export default App;
