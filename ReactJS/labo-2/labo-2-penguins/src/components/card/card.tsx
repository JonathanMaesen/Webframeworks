import type { penguin } from "../../interfaces.ts";

interface cardProps {
    penguin: penguin;
}

export const Card = ({ penguin } : cardProps) => {
    return (
            <div about={"card inner shell"}>
                <img src={penguin.image} alt={penguin.nickname}/>
                <p>{penguin.nickname}</p>
                <p> <strong>Species ID</strong> {penguin.species_id}</p>
                <p> <strong>Description</strong> {penguin.description}</p>
                <p> <strong>Island</strong> {penguin.island}</p>
                <p> <strong>Gender</strong> {penguin.gender}</p>
            </div>
    )
}