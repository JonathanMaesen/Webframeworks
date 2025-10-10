import "./App.css";
import { useState, useCallback } from "react";

const lifeOrDeath = (): boolean => Math.random() < 0.5;

type Board = boolean[][];

export default function App() {
    const [width, setWidth] = useState<number>(10);
    const [height, setHeight] = useState<number>(10);
    const [board, setBoard] = useState<Board>([]);

    const makeBoard = useCallback((w: number, h: number): Board => {
        return Array.from({ length: h }, () =>
            Array.from({ length: w }, () => lifeOrDeath())
        );
    }, []);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (width > 0 && height > 0) {
            const newBoard = makeBoard(width, height);
            setBoard(newBoard);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <label htmlFor="width">Width</label>
                <input
                    id="width"
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.currentTarget.value || "0", 10))}
                />

                <label htmlFor="height">Height</label>
                <input
                    id="height"
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.currentTarget.value || "0", 10))}
                />

                <button type="submit">Generate</button>
            </form>

            <div
                style={{
                    marginTop: 16,
                    display: "grid",
                    gridTemplateColumns: `repeat(${width}, 18px)`,
                    gap: 2,
                }}
            >
                {board.map((row, rIdx) =>
                    row.map((alive, cIdx) => (
                        <div
                            key={`${rIdx}-${cIdx}`}
                            style={{
                                width: 18,
                                height: 18,
                                border: "1px solid #ccc",
                                background: alive ? "#222" : "#eee",
                            }}
                        />
                    ))
                )}
            </div>
        </>
    );
}
