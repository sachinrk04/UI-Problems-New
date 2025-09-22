import type {Question} from "./quizType";

export const questionsList: Question[] = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and largest city of France.",
    },
    {
        id: 2,
        question:
            "Which programming language is known for its use in web development and has a logo featuring a coffee cup?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correctAnswer: 2,
        explanation: "Java is known for its coffee cup logo and is widely used in enterprise web development.",
    },
    {
        id: 3,
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 2,
        explanation:
            "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined.",
    },
    {
        id: 4,
        question: "In React, what hook is used to manage component state?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation: "useState is the primary hook for managing local component state in React functional components.",
    },
    {
        id: 5,
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 2,
        explanation: "CSS stands for Cascading Style Sheets, which is used to style HTML documents.",
    },
];
