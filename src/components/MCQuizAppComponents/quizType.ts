export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

export interface QuizResult {
    score: number;
    totalQuestions: number;
    timeSpent: number;
    answers: {questionId: number; selectedAnswer: number; isCorrect: boolean; isSkipped: boolean}[];
    skippedCount: number;
}

export interface QuizState {
    currentQuestion: number;
    selectedAnswers: {[key: number]: number | undefined};
    skippedQuestions: {[key: number]: boolean};
    isCompleted: boolean;
    startTime: number;
    result?: QuizResult;
}
