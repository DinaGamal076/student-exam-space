
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockExams } from "@/data/mockData";
import { Plus, Edit, Trash2, Clock, Users } from "lucide-react";

interface ExamManagerProps {
  onSelectExam: (exam: any) => void;
}

export const ExamManager = ({ onSelectExam }: ExamManagerProps) => {
  const [exams, setExams] = useState(mockExams);
  const [showForm, setShowForm] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingExam) {
      setExams(exams.map(exam => 
        exam.id === editingExam.id 
          ? { ...exam, ...formData }
          : exam
      ));
    } else {
      const newExam = {
        id: Date.now(),
        ...formData,
        questions: [],
        createdAt: new Date().toISOString(),
      };
      setExams([...exams, newExam]);
    }

    setShowForm(false);
    setEditingExam(null);
    setFormData({ title: "", description: "", duration: 30 });
  };

  const handleEdit = (exam: any) => {
    setEditingExam(exam);
    setFormData({
      title: exam.title,
      description: exam.description,
      duration: exam.duration,
    });
    setShowForm(true);
  };

  const handleDelete = (examId: number) => {
    if (confirm("Are you sure you want to delete this exam?")) {
      setExams(exams.filter(exam => exam.id !== examId));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingExam(null);
    setFormData({ title: "", description: "", duration: 30 });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Exams</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Exam
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingExam ? "Edit Exam" : "Create New Exam"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Exam Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  required
                  min="1"
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">
                  {editingExam ? "Update Exam" : "Create Exam"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{exam.title}</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(exam)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(exam.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{exam.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  Duration: {exam.duration} minutes
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  Questions: {exam.questions.length}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => onSelectExam(exam)}
              >
                Manage Questions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
