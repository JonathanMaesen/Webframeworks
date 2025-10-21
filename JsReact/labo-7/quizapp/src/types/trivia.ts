export interface TriviaQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface TriviaApiResponse {
    response_code: number;
    results: TriviaQuestion[];
}

export type TriviaQuestionWithChoices = TriviaQuestion & { choices: string[] };
