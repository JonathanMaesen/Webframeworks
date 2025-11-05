import { useEffect, useState } from "react";
import type { TriviaApiResponse, TriviaQuestionWithChoices } from "../types/trivia";
import { shuffleArray } from "../utils/shuffle";


export function useTrivia(questionTotal: number, difficulty: string, reloadCounter: number) {
    const [questions, setQuestions] = useState<TriviaQuestionWithChoices[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {
        const abortController = new AbortController();


        (async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);


                const response = await fetch(
                    `https://opentdb.com/api.php?amount=${questionTotal}&difficulty=${difficulty}`,
                    { headers: { Accept: "application/json" }, signal: abortController.signal }
                );
                if (!response.ok) throw new Error(`HTTP ${response.status}`);


                const apiData: TriviaApiResponse = await response.json();
                const normalized = apiData.results.map((q) => ({
                    ...q,
                    choices: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
                }));
                setQuestions(normalized);
            } catch (e) {
                if (!(e instanceof DOMException && e.name === "AbortError")) {
                    setErrorMessage(e instanceof Error ? e.message : "Unknown error");
                }
            } finally {
                setIsLoading(false);
            }
        })();


        return () => abortController.abort();
    }, [questionTotal, difficulty, reloadCounter]);


    return { questions, isLoading, errorMessage };
}