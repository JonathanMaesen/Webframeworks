import { useState } from "react";
import { useTrivia } from "../hooks/useTrivia";
import { QuestionCard } from "./QuestionCard";


export function Quiz() {
    const [questionTotal, setQuestionTotal] = useState(10);
    const [reloadCounter, setReloadCounter] = useState(0);
    const [selectedAnswerByIndex, setSelectedAnswerByIndex] = useState<Record<number, string>>({});


    const { questions, isLoading, errorMessage } = useTrivia(questionTotal, reloadCounter);


    const handleSelect = (qIndex: number, answer: string) =>
        setSelectedAnswerByIndex((prev) => ({ ...prev, [qIndex]: answer }));


    if (isLoading) return <p>Loading…</p>;
    if (errorMessage) return <p>Error: {errorMessage}</p>;


    return (
        <>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button onClick={() => setReloadCounter((n) => n + 1)}>Reload</button>
                <button onClick={() => setQuestionTotal((n) => n + 10)}>+10 questions</button>
                <span>Count: {questionTotal}</span>
            </div>


            {questions.map((q, index) => (
                <QuestionCard
                    Key={index}
                    question={q}
                    index={index}
                    selectedAnswer={selectedAnswerByIndex[index]}
                    onSelect={(answer) => handleSelect(index, answer)}
                />
            ))}
        </>
    );
}