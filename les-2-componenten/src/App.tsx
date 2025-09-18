import React from "react";

interface Game {
    id: number
    name: string,
    releaseYear: number,
    sales: number
}

const games : Game[] = [
    {
        id: 0,
        name: "World of Warcraft",
        releaseYear: 2004,
        sales: 5
    },
    {
        id: 1,
        name: "Valheim",
        releaseYear: 2021,
        sales: 10
    },
    {
        id: 2,
        name: "Minecraft",
        releaseYear: 2011,
        sales: 20
    }
]

interface GameListItemProps {
    game: Game
}

GameListItem = (props: GameListItemProps) => {
    return <React.Fragment key={props.id}>
        <h2>{props.name} ({props.releaseYear})</h2>
        <p>Aantal keer verkocht: {props.sales}</p>
    </React.Fragment>
}

const List = () => {
    return (
        <div>
            {games.map((game: Game) => {
                return <React.Fragment key={game.id}>
                    <h2>{game.name} ({game.releaseYear})</h2>
                    <p>Aantal keer verkocht: {game.sales}</p>
                </React.Fragment>
            })}
        </div>
    );
}

const App = () => {
    return (
        <div>
            <h1>Welcome to the H2O Game shop</h1>
            <List/>
        </div>
    );
}
export default App;