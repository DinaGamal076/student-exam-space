
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamManager } from "./ExamManager";
import { QuestionManager } from "./QuestionManager";
import { ResultsViewer } from "./ResultsViewer";
import { Plus, FileText, HelpCircle, BarChart3 } from "lucide-react";

interface AdminDashboardProps {
  user: any;
}

export const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<"overview" | "exams" | "questions" | "results">("overview");
  const [selectedExam, setSelectedExam] = useState<any>(null);

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "exams", label: "Manage Exams", icon: FileText },
    { id: "questions", label: "Manage Questions", icon: HelpCircle },
    { id: "results", label: "View Results", icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                currentView === item.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {currentView === "overview" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Total Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">3</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Total Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">15</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Student Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">0</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setCurrentView("exams")} 
                    className="w-full justify-start"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Exam
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView("questions")}
                    className="w-full justify-start"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Questions
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView("results")}
                    className="w-full justify-start"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Student Results
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-8">
                    No recent activity to display
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentView === "exams" && (
          <ExamManager onSelectExam={setSelectedExam} />
        )}

        {currentView === "questions" && (
          <QuestionManager selectedExam={selectedExam} />
        )}

        {currentView === "results" && (
          <ResultsViewer />
        )}
      </div>
    </div>
  );
};
