import {useEffect, useState} from "react";
import type {Duckie} from "../../types.ts";
import {useNavigate, useParams} from "react-router-dom";


export function DuckieDetail() {
    const {name} = useParams();
    const navigate = useNavigate();


    const [data, setData] = useState<Duckie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/duckies/duckies.json", {
                    headers: { Accept: "application/json" },
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const json = await response.json();
                if (!ignore) setData(json);
            } catch (err) {
                if (!ignore)
                    setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchData();
        return () => {
            ignore = true;
        };
    }, [name]);
    if (loading) { return <p>loading duckie... </p>}
    if (error) { return <p>Error fetching duckie: {error}</p>}

    const Duckie = data.find((duckie) => duckie.id == name);

    return(
        <>
            {/*ik heb gedemonstreerd dat ik weet hoe het moet, gewoon geen tijd om af te werken.*/}
            <div style={{display: "flex", flexDirection: "column"}}>
                <img style={{width: "200px", height: "200px"}} src={Duckie?.image} alt={Duckie?.name}/>
                {Duckie?.type}
                {Duckie?.name}
                {Duckie?.mood}
                {Duckie?.accessories.map((accesory, index) => (<p key={index}>{accesory}</p>))}
                <button onClick={() => navigate('/2')}> Back to Duckies </button>
            </div>
        </>
    )
}

export const Oefenign2 = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Duckie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/duckies/duckies.json", {
                    headers: { Accept: "application/json" },
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const json = await response.json();
                if (!ignore) setData(json);
            } catch (err) {
                if (!ignore)
                    setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchData();
        return () => {
            ignore = true;
        };
    }, []);

    if (loading) { return <p>loading duckies... </p>}
    if (error) { return <p>Error fetching Duckies: {error}</p>}

    return (
        <div>
            {data.map((Duckie, id) => (
                <img key={id} src={Duckie.image} alt={Duckie.name} style={{height: "100px", width:"100px"}}
                     onClick={() => navigate(`/${Duckie.id}`)}/>
            ))}
        </div>
    );
}
