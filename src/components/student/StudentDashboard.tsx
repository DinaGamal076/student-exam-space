
import { useState } from "react";
import { ExamList } from "./ExamList";
import { ExamTaking } from "./ExamTaking";
import { ExamResults } from "./ExamResults";
import { mockExams } from "@/data/mockData";

interface StudentDashboardProps {
  user: any;
}

export const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const [currentView, setCurrentView] = useState<"list" | "taking" | "results">("list");
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [examResult, setExamResult] = useState<any>(null);

  const handleStartExam = (exam: any) => {
    setSelectedExam(exam);
    setCurrentView("taking");
  };

  const handleExamSubmit = (answers: any[], timeSpent: number) => {
    // Calculate score
    let correct = 0;
    selectedExam.questions.forEach((question: any, index: number) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / selectedExam.questions.length) * 100);
    const result = {
      examId: selectedExam.id,
      examTitle: selectedExam.title,
      score,
      correct,
      total: selectedExam.questions.length,
      timeSpent,
      completedAt: new Date().toISOString(),
    };

    setExamResult(result);
    setCurrentView("results");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedExam(null);
    setExamResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentView === "list" && (
        <ExamList exams={mockExams} onStartExam={handleStartExam} />
      )}
      
      {currentView === "taking" && selectedExam && (
        <ExamTaking 
          exam={selectedExam} 
          onSubmit={handleExamSubmit}
          onBack={handleBackToList}
        />
      )}
      
      {currentView === "results" && examResult && (
        <ExamResults 
          result={examResult} 
          onBackToList={handleBackToList}
        />
      )}
    </div>
  );
};
