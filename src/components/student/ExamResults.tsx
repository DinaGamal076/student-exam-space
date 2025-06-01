
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, Trophy } from "lucide-react";

interface ExamResultsProps {
  result: any;
  onBackToList: () => void;
}

export const ExamResults = ({ result, onBackToList }: ExamResultsProps) => {
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600' };
    if (score >= 80) return { grade: 'B', color: 'text-blue-600' };
    if (score >= 70) return { grade: 'C', color: 'text-yellow-600' };
    if (score >= 60) return { grade: 'D', color: 'text-orange-600' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const { grade, color } = getGrade(result.score);

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6" />
            Exam Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold ${color} mb-2`}>
              {result.score}%
            </div>
            <div className={`text-2xl font-semibold ${color}`}>
              Grade: {grade}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Correct</span>
              </div>
              <div className="text-2xl font-bold">{result.correct}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <XCircle className="h-5 w-5" />
                <span className="font-semibold">Incorrect</span>
              </div>
              <div className="text-2xl font-bold">{result.total - result.correct}</div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Time Spent</span>
            </div>
            <div className="text-lg">{result.timeSpent} minutes</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Exam Details:</h3>
            <p className="text-gray-600">Exam: {result.examTitle}</p>
            <p className="text-gray-600">
              Completed: {new Date(result.completedAt).toLocaleString()}
            </p>
            <p className="text-gray-600">
              Score: {result.correct} out of {result.total} questions correct
            </p>
          </div>

          <Button onClick={onBackToList} className="w-full">
            Back to Exams
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
