
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ArrowLeft } from "lucide-react";

interface ExamTakingProps {
  exam: any;
  onSubmit: (answers: any[], timeSpent: number) => void;
  onBack: () => void;
}

export const ExamTaking = ({ exam, onSubmit, onBack }: ExamTakingProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>(new Array(exam.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // Convert to seconds
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // Convert to minutes
    onSubmit(answers, timeSpent);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const question = exam.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exams
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5" />
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {exam.questions.length}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{exam.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {currentQuestion + 1}. {question.text}
            </h3>
            
            <RadioGroup
              value={answers[currentQuestion] || ""}
              onValueChange={handleAnswerSelect}
            >
              {question.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentQuestion === exam.questions.length - 1 ? (
                <Button onClick={handleSubmit}>
                  Submit Exam
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question navigation */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Question Navigation:</h4>
        <div className="flex flex-wrap gap-2">
          {exam.questions.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded text-sm font-medium ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answers[index]
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
