import { useEffect, useState } from "react";

interface DadJoke {
    id: string;
    joke: string;
}

export function DadJoke() {
    const [dataList, setDataList] = useState<DadJoke[]>([]);
    const [data, setData] = useState<DadJoke>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<number>(0);

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("https://icanhazdadjoke.com/", {
                    headers: { Accept: "application/json" },
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const json = await response.json();
                if (!ignore){
                    setData(json);
                    setDataList(prevState => [...prevState, json])
                }
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
    }, [reload]);

    return (
        <div>
            {loading && <p>loading....</p>}
            {error && <p style={{color: "red"}}>{error}</p>}
            {data && <p>{data.joke}</p>}

            <button onClick={() => setReload((r) => r + 1)}>New joke</button>

            <h3>History</h3>
            <ul>
                {dataList.map((j) => (
                    <li key={j.id}>{j.joke}</li>
                ))}
            </ul>
        </div>
    );
}

