import "./App.css";
import { useState } from "react";

interface SquareProps {
    backGroundColor: string;
    isComplete: boolean;
    onClick: () => void;
}

function Square({ backGroundColor, isComplete, onClick }: SquareProps) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
            style={{
                backgroundColor: backGroundColor,
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "2rem",
                userSelect: "none",
                border: isComplete ? "3px solid #222" : "3px solid transparent",
                transition: "transform 120ms ease, border-color 120ms ease",
                transform: isComplete ? "scale(0.98)" : "scale(1)",
            }}
            aria-pressed={isComplete}
        >
            {isComplete ? "😐" : "😃"}
        </div>
    );
}

function App() {
    const [completed, setCompleted] = useState<boolean[]>([false, false, false]);

    const toggle = (index: number) =>
        setCompleted((prev) => prev.map((v, i) => (i === index ? !v : v)));

    const total = completed.length;
    const done = completed.filter(Boolean).length;
    const percent = Math.round((done / total) * 100);

    return (
        <>
            <div style={{ width: 320, marginBottom: 12 }}>
                <div
                    style={{
                        height: 16,
                        width: "100%",
                        background: "#eee",
                        overflow: "hidden",
                        border: "1px solid #ddd",
                    }}
                    aria-label="Progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percent}
                    role="progressbar"
                >
                    <div
                        style={{
                            height: "100%",
                            width: `${percent}%`,
                            background: "green",
                            transition: "width 200ms ease",
                        }}
                    />
                </div>
                <div style={{ marginTop: 6, fontFamily: "sans-serif", fontSize: 12 }}>
                    {done}/{total} complete ({percent}%)
                </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
                <Square
                    backGroundColor="red"
                    isComplete={completed[0]}
                    onClick={() => toggle(0)}
                />
                <Square
                    backGroundColor="green"
                    isComplete={completed[1]}
                    onClick={() => toggle(1)}
                />
                <Square
                    backGroundColor="yellow"
                    isComplete={completed[2]}
                    onClick={() => toggle(2)}
                />
            </div>
        </>
    );
}

export default App;
