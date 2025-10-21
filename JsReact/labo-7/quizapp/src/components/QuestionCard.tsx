import type { TriviaQuestionWithChoices } from "../types/trivia";


interface QuestionCardProps {
    question: TriviaQuestionWithChoices;
    index: number;
    selectedAnswer?: string;
    onSelect: (answer: string) => void;
}


export function QuestionCard({ question, index, selectedAnswer, onSelect }: QuestionCardProps) {
    return (
        <div style={{ marginBottom: 24 }}>
            <p>Question {index + 1}</p>
            <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
            <ul style={{ listStyle: "none", padding: 0 }}>
                {question.choices.map((answer, choiceIndex) => {
                    const isPicked = selectedAnswer === answer;
                    const isCorrect = answer === question.correct_answer;
                    const backgroundColor = selectedAnswer
                        ? isCorrect
                            ? "#d1fadf"
                            : isPicked
                                ? "#ffe1e1"
                                : "#f3f3f3"
                        : "#f3f3f3";


                    return (
                        <li key={choiceIndex} style={{ marginBottom: 8 }}>
                            <button
                                onClick={() => onSelect(answer)}
                                disabled={Boolean(selectedAnswer)}
                                style={{
                                    width: "100%",
                                    textAlign: "left",
                                    padding: "8px 12px",
                                    borderRadius: 8,
                                    border: "1px solid #ddd",
                                    background: backgroundColor,
                                    cursor: selectedAnswer ? "not-allowed" : "pointer",
                                }}
                                dangerouslySetInnerHTML={{ __html: answer }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}