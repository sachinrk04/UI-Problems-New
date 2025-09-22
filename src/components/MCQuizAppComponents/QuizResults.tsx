import { Clock, RotateCcw, SkipForward, Target, Trophy } from "lucide-react";
import type { QuizResult } from "./quizType";
import { Button } from "../ui/button";

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onReviewAnswers: () => void;
}

const QuizResults = ({
  result,
  onRestart,
  onReviewAnswers,
}: QuizResultsProps) => {
  console.log("result---->", result);
  const answeredQuestions = result.totalQuestions - result.skippedCount;
  // const percentage =
  //   answeredQuestions > 0
  //     ? Math.round((result.score / answeredQuestions) * 100)
  //     : 0;
  const overallPercentage = Math.round(
    (result.score / result.totalQuestions) * 100
  );
  const minutes = Math.floor(result.timeSpent / 60);
  const seconds = result.timeSpent % 60;

  return (
    <div className="max-w-2xl mx-auto p-4 rounded-md border">
      <div className="text-center">
        <div className="mx-auto mb-2 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Trophy className="w-8 h-8 text-primary" />
        </div>
        <div className="text-xl font-semibold">Quiz Complete!</div>
      </div>
      <div className="flex justify-between gap-4 mt-4">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">
              Score
            </span>
          </div>
          <div className={`text-2xl font-bold text-foreground`}>
            {result.score}/{answeredQuestions}
          </div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">
              Time
            </span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">
              Overall
            </span>
          </div>
          <div className={`text-2xl font-bold text-foreground`}>
            {overallPercentage}
          </div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <SkipForward className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-sm font-medium text-muted-foreground">
              Skipped
            </span>
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {result.skippedCount}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={onReviewAnswers}
        >
          Review Answers
        </Button>
        <Button className="flex-1" onClick={onRestart}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Take Quiz Again
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
