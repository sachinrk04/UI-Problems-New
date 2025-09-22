import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import ProgressBar from "@/components/MCQuizAppComponents/ProgressBar";
import QuestionCard from "@/components/MCQuizAppComponents/QuestionCard";
import { questionsList } from "@/components/MCQuizAppComponents/questionsList";
import type {
  QuizResult,
  QuizState,
} from "@/components/MCQuizAppComponents/quizType";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SkipForward } from "lucide-react";
import QuizResults from "@/components/MCQuizAppComponents/QuizResults";

const MCQuizApp = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: {},
    skippedQuestions: {},
    isCompleted: false,
    startTime: Date.now(),
  });

  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentQuestion = questionsList[quizState.currentQuestion];
  const isLastQuestion = quizState.currentQuestion === questionsList.length - 1;
  const hasSelectedAnswer =
    quizState.selectedAnswers[currentQuestion?.id] !== undefined;
  const isCurrentQuestionSkipped =
    quizState.skippedQuestions[currentQuestion?.id] === true;

  const handleAnswerSelect = (answerIndex: number) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [currentQuestion.id]: answerIndex,
      },
      skippedQuestions: {
        ...prev.skippedQuestions,
        [currentQuestion.id]: false,
      },
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestion < questionsList.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const canFinishQuiz = questionsList.every(
    (question) =>
      quizState.selectedAnswers[question.id] !== undefined ||
      quizState.skippedQuestions[question.id] === true
  );

  const handleSkipQuestion = () => {
    if (quizState.isCompleted) return;

    setQuizState((prev) => ({
      ...prev,
      skippedQuestions: {
        ...prev.skippedQuestions,
        [currentQuestion.id]: true,
      },

      selectedAnswers: {
        ...prev.selectedAnswers,
        [currentQuestion.id]: undefined,
      },
    }));

    if (!isLastQuestion) {
      handleNext();
    }
  };

  const handleFinishQuiz = () => {
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - quizState.startTime) / 1000);

    const answers = questionsList.map((question) => {
      const selectedAnswer = quizState.selectedAnswers[question.id];
      const isSkipped = quizState.skippedQuestions[question.id] === true;

      return {
        questionId: question.id,
        selectedAnswer: selectedAnswer ?? -1,
        isCorrect: !isSkipped && selectedAnswer === question.correctAnswer,
        isSkipped: isSkipped,
      };
    });

    const score = answers.filter((answer) => answer.isCorrect).length;
    const skippedCount = answers.filter((answer) => answer.isSkipped).length;

    const result: QuizResult = {
      score,
      totalQuestions: questionsList.length,
      timeSpent,
      answers,
      skippedCount,
    };

    setQuizState((prev) => ({
      ...prev,
      isCompleted: true,
      result,
    }));
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      skippedQuestions: {},
      isCompleted: false,
      startTime: Date.now(),
    });
    setIsReviewMode(false);
  };

  const onReviewAnswers = () => {
    setIsReviewMode(true);
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: 0,
    }));
  };

  const exitReviewMode = () => {
    setIsReviewMode(false);
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: 0,
    }));
  };

  if (quizState.isCompleted && !isReviewMode) {
    return (
      <div className="pt-[10%] bg-background p-4 flex items-center justify-center">
        <QuizResults
          result={quizState.result!}
          onRestart={handleRestart}
          onReviewAnswers={onReviewAnswers}
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 items-center">
        <PageHeader title="General Knowledge Quiz" />
        <div className="max-w-4xl mt-2">
          {isReviewMode ? (
            <div className="flex items-center justify-center gap-4">
              <p className="text-muted-foreground">
                Review Mode - See correct answers
              </p>
              <Button variant={"outline"} size={"sm"} onClick={exitReviewMode}>
                Exit Review
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground text-center">
              Answer questions or skip them to complete the quiz
            </p>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="mt-8 flex flex-col gap-y-2">
          <ProgressBar
            currentQuestion={quizState.currentQuestion + 1}
            totalQuestions={questionsList.length}
          />
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-[650px] p-4 border rounded-md">
            <QuestionCard
              question={currentQuestion}
              questionNumber={quizState.currentQuestion + 1}
              totalQuestions={questionsList.length}
              selectedAnswer={quizState.selectedAnswers[currentQuestion.id]}
              onAnswerSelect={handleAnswerSelect}
              showResult={isReviewMode}
              isSkipped={isCurrentQuestionSkipped}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={quizState.currentQuestion === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex gap-2">
            {!isReviewMode && (
              <Button
                variant={"outline"}
                className="text-muted-foreground hover:text-foreground bg-transparent"
                onClick={handleSkipQuestion}
              >
                <SkipForward className="w-4 h-4" />
                Skip
              </Button>
            )}

            {!isLastQuestion ? (
              <Button
                onClick={handleNext}
                disabled={
                  !hasSelectedAnswer &&
                  !isCurrentQuestionSkipped &&
                  !isReviewMode
                }
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              !isReviewMode && (
                <Button
                  onClick={handleFinishQuiz}
                  disabled={!canFinishQuiz}
                  className="bg-primary hover:bg-primary/90"
                >
                  Finish
                </Button>
              )
            )}
          </div>
        </div>
        {!isReviewMode && !canFinishQuiz && isLastQuestion && (
          <div className="mt-4 border border-yellow-500 bg-yellow-100  rounded-md">
            <div className="p-4">
              <p className="text-sm text-yellow-800 ">
                Please answer or skip all questions before finishing the quiz.
                Remaining questions:{" "}
                {questionsList.length -
                  Object.keys(quizState.selectedAnswers).length -
                  Object.keys(quizState.skippedQuestions).filter(
                    (key) => quizState.skippedQuestions[Number.parseInt(key)]
                  ).length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQuizApp;
