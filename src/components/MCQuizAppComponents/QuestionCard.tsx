import { CheckCircle, SkipForward, XCircle } from "lucide-react";
import type { Question } from "./quizType";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswerSelect: (answer: number) => void;
  showResult?: boolean;
  isSkipped?: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
  isSkipped = false,
}: QuestionCardProps) => {
  const getOptionIcon = (optionIndex: number) => {
    if (!showResult) return null;

    if (optionIndex === question.correctAnswer) {
      return (
        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      );
    }

    if (
      selectedAnswer === optionIndex &&
      optionIndex !== question.correctAnswer
    ) {
      return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
    }

    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Question {questionNumber} / {totalQuestions}
        </span>
        {showResult && isSkipped && (
          <div className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400">
            <SkipForward className="w-4 h-4" />
            <span>Skipped</span>
          </div>
        )}
      </div>
      <div className="text-lg font-semibold mb-3">{question.question}</div>
      <div className="flex flex-col gap-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between gap-1 p-2 rounded-sm border cursor-pointer",
              showResult ? "cursor-default" : "hover:bg-primary/20"
            )}
            onClick={() => !showResult && onAnswerSelect(index)}
          >
            <div className="flex items-center justify-between gap-1">
              <input
                type="radio"
                name={`question-${questionNumber}`}
                value={index}
                checked={selectedAnswer === index}
                disabled={showResult}
                className="w-4 h-4"
                onChange={() => !showResult && onAnswerSelect(index)}
              />
              <label className="text-md text-muted-foreground">{option}</label>
            </div>
            <div className="flex items-center justify-between">
              {getOptionIcon(index)}
            </div>
          </div>
        ))}
      </div>

      {showResult && isSkipped && (
        <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <p className="text-sm text-orange-800 dark:text-orange-200">
            This question was skipped. The correct answer is highlighted above.
          </p>
        </div>
      )}

      {showResult && !isSkipped && question.explanation && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground font-medium mb-1">
            Explanation:
          </p>
          <p className="text-sm text-pretty leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
