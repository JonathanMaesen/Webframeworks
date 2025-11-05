import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTrivia } from "../hooks/useTrivia";
import { QuestionCard } from "./QuestionCard";

export function Quiz() {
    const { difficulty } = useParams<{ difficulty: string }>();
    const [questionTotal] = useState(10);
    const [reloadCounter, setReloadCounter] = useState(0);
    const [selectedAnswerByIndex, setSelectedAnswerByIndex] = useState<Record<number, string>>({});

    const { questions, isLoading, errorMessage } = useTrivia(questionTotal, difficulty ?? 'easy', reloadCounter);

    useEffect(() => {
        setReloadCounter(c => c + 1);
        setSelectedAnswerByIndex({});
    }, [difficulty]);

    const handleSelect = (qIndex: number, answer: string) =>
        setSelectedAnswerByIndex((prev) => ({ ...prev, [qIndex]: answer }));

    if (isLoading) return <p>Loading…</p>;
    if (errorMessage) return <p>Error: {errorMessage}</p>;

    return (
        <div className="quiz-container">
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button onClick={() => setReloadCounter((n) => n + 1)}>New Questions</button>
            </div>

            {questions.map((q, index) => (
                <QuestionCard
                    key={index}
                    question={q}
                    index={index}
                    selectedAnswer={selectedAnswerByIndex[index]}
                    onSelect={(answer) => handleSelect(index, answer)}
                />
            ))}
        </div>
    );
}

export default Quiz;