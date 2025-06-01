
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, Users } from "lucide-react";

interface ExamListProps {
  exams: any[];
  onStartExam: (exam: any) => void;
}

export const ExamList = ({ exams, onStartExam }: ExamListProps) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Exams</h1>
        <p className="text-gray-600">Choose an exam to get started</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {exam.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{exam.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  Duration: {exam.duration} minutes
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  Questions: {exam.questions.length}
                </div>
              </div>
              
              <Button onClick={() => onStartExam(exam)} className="w-full">
                Start Exam
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
