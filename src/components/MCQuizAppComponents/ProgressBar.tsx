interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}
const ProgressBar = ({ currentQuestion, totalQuestions }: ProgressBarProps) => {
  const percentage = (currentQuestion / totalQuestions) * 100;
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-sm font-medium">
          Progress
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {currentQuestion} / {totalQuestions}
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </>
  );
};

export default ProgressBar;
