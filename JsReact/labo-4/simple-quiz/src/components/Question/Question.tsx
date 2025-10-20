import { useState } from "react";
import styles from './Question.module.css';
interface QuestionProps {
    question: string;
    options: string[];
    correctAnswer: string;
    finished: boolean;
}

export function Question({ question, options, correctAnswer, finished}: QuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    return (
        <div>
            <h3>{question}</h3>

            {options.map((option, index) => {
                let className = "";

                if (finished) {
                    if (option === correctAnswer) {
                        className = styles.correct;
                    } else if (option === selectedOption) {
                        className = styles.incorrect;
                    }
                }
                return (
                    <label key={index} className={className} style={{ display: "block" }}>
                        <input
                            type="radio"
                            name="quiz-option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={e => setSelectedOption(e.target.value)}
                            disabled={finished}
                        />
                        {option}
                    </label>
                );
            })}
        </div>
    );
}
