
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockExams } from "@/data/mockData";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";

interface QuestionManagerProps {
  selectedExam: any;
}

export const QuestionManager = ({ selectedExam }: QuestionManagerProps) => {
  const [exams] = useState(mockExams);
  const [currentExam, setCurrentExam] = useState(selectedExam);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [formData, setFormData] = useState({
    text: "",
    type: "multiple_choice",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleExamSelect = (examId: string) => {
    const exam = exams.find(e => e.id === Number(examId));
    setCurrentExam(exam);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentExam) return;

    // In a real app, this would update the backend
    console.log("Question saved:", formData);
    
    setShowForm(false);
    setEditingQuestion(null);
    setFormData({
      text: "",
      type: "multiple_choice",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
    setFormData({
      text: "",
      type: "multiple_choice",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Questions</h1>
        <Button onClick={() => setShowForm(true)} disabled={!currentExam}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      {!currentExam && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select an Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="exam-select">Choose an exam to manage questions:</Label>
            <Select onValueChange={handleExamSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select an exam" />
              </SelectTrigger>
              <SelectContent>
                {exams.map((exam) => (
                  <SelectItem key={exam.id} value={exam.id.toString()}>
                    {exam.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {currentExam && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Questions for: {currentExam.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Total Questions: {currentExam.questions.length}
              </p>
              <Button 
                variant="outline" 
                onClick={() => setCurrentExam(null)}
                className="mt-2"
              >
                Change Exam
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showForm && currentExam && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingQuestion ? "Edit Question" : "Add New Question"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="question-text">Question Text</Label>
                <Textarea
                  id="question-text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="question-type">Question Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                    <SelectItem value="true_false">True/False</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.type === "multiple_choice" && (
                <div>
                  <Label>Answer Options</Label>
                  {formData.options.map((option, index) => (
                    <div key={index} className="mt-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <Label htmlFor="correct-answer">Correct Answer</Label>
                {formData.type === "multiple_choice" ? (
                  <Select value={formData.correctAnswer} onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.options.filter(option => option.trim()).map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Select value={formData.correctAnswer} onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="True">True</SelectItem>
                      <SelectItem value="False">False</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingQuestion ? "Update Question" : "Add Question"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {currentExam && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Existing Questions</h2>
          {currentExam.questions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No questions added yet.</p>
                <Button onClick={() => setShowForm(true)} className="mt-4">
                  Add First Question
                </Button>
              </CardContent>
            </Card>
          ) : (
            currentExam.questions.map((question: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Question {index + 1}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{question.text}</p>
                  <div className="space-y-2">
                    {question.options.map((option: string, optIndex: number) => (
                      <div 
                        key={optIndex}
                        className={`p-2 rounded ${
                          option === question.correctAnswer 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100'
                        }`}
                      >
                        {option}
                        {option === question.correctAnswer && (
                          <span className="ml-2 text-sm">(Correct)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};
