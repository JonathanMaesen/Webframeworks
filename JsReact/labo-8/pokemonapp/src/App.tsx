import styles from "./App.module.css";
import { Outlet, createBrowserRouter, RouterProvider, NavLink, Link, useParams } from "react-router-dom";
import ProfOak from "./assets/ProfOak.png";
import { useState, useEffect } from "react";
import type { PokemonListItem, PokemonDetailData } from "./interfaces.ts";

const Root = () => {
    return (
        <>
            <header className={styles.topBar}>
                <nav className={styles.navContainer}>
                    <NavLink className={({isActive}) => isActive ? styles.activeNavLink : styles.navLink} to="/">Home</NavLink>
                    <NavLink className={({isActive}) => isActive ? styles.activeNavLink : styles.navLink} to="/pokedex">Poke-Dex</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}

const Home = () => {
    const textArray: string[] = [
        "Hello there! Welcome to the world of POKEMON!",
        "My name is OAK! People call me the POKEMON PROF!",
        "This world is inhabited by creatures called POKEMON!",
        "For some people, POKEMON are pets. Others use them for fights. Myself...I study POKEMON as a profession"
    ]

    // noinspection TypeScriptValidateTypes
    return (
        <div className={styles.BodyHome}>
            <div>
                <img src={ProfOak} alt="Professor Oak welcoming you" />
            </div>
            <div className={styles.TextArea}>
                {
                    textArray.map((item) => (
                        <p key={item}>
                            {item}
                        </p>
                    ))
                }
            </div>
        </div>

    )
}

const PokeDex = () => {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const countResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
                if (!countResponse.ok) throw new Error('Failed to fetch Pokémon count');
                const countData = await countResponse.json();
                const totalPokemon = countData.count;
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}`);
                if (!response.ok) throw new Error('Failed to fetch the full Pokémon list');
                const data = await response.json();

                setPokemonList(data.results);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchAllPokemon();
    }, []);
    if (loading) return <div>Loading all Pokémon...</div>;

    if (error) return <div>Error: {error}</div>;


    const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.pokedexContainer}>
            <h1>All Pokémon</h1>
            <input
                type="text"
                placeholder="Search Pokémon..."
                className={styles.searchBar}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul className={styles.pokemonList}>
                {filteredPokemon.map(pokemon => (
                    <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`} className={styles.pokemonListItem}>
                        <li>{pokemon.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

const PokemonDetail = () => {
    const { pokemonName } = useParams<{ pokemonName: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            if (!pokemonName) return;
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                if (!response.ok) {
                    throw new Error(`Could not find Pokémon: ${pokemonName}`);
                }
                const data: PokemonDetailData = await response.json();
                setPokemon(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetail();
    }, [pokemonName]);

    if (loading) return <div>Loading details for {pokemonName}...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pokemon) return <div>No Pokémon data found.</div>;

    return (
        <div className={styles.detailContainer}>
            <h1 className={styles.detailName}>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.detailImage} />

            <div className={styles.detailGrid}>
                <div className={styles.detailCard}>
                    <h2>Types</h2>
                    {pokemon.types.map(t => <p key={t.type.name}>{t.type.name}</p>)}
                </div>
                <div className={styles.detailCard}>
                    <h2>Abilities</h2>
                    {pokemon.abilities.map(a => <p key={a.ability?.name}>{a.ability?.name}</p>)}
                </div>
                <div className={styles.detailCard}>
                    <h2>Base Stats</h2>
                    {pokemon.stats.map(s => <p key={s.stat.name}>{s.stat.name}: {s.base_stat}</p>)}
                </div>
            </div>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "pokedex",
                element: <PokeDex/>
            },
            {
                path: "pokemon/:pokemonName",
                element: <PokemonDetail />
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
