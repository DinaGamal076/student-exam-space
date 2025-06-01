
import { useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Button } from "@/components/ui/button";

// Mock user data - in real app this would come from Supabase
const mockUsers = [
  { id: 1, email: "student@test.com", password: "password", role: "student", name: "John Doe" },
  { id: 2, email: "admin@test.com", password: "password", role: "admin", name: "Admin User" },
];

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleAuth = (email: string, password: string, isLogin: boolean) => {
    if (isLogin) {
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        setUser(foundUser);
      } else {
        alert("Invalid credentials");
      }
    } else {
      // Registration logic would go here
      const newUser = {
        id: Date.now(),
        email,
        password,
        role: "student",
        name: email.split("@")[0]
      };
      setUser(newUser);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">ExamSpace</h1>
            <p className="text-gray-600">Your Online Examination Platform</p>
          </div>
          
          <AuthForm 
            onAuth={handleAuth}
            isLogin={showLogin}
            onToggleMode={() => setShowLogin(!showLogin)}
          />
          
          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-2">Demo Accounts:</h3>
            <p className="text-sm text-gray-600 mb-1">Student: student@test.com / password</p>
            <p className="text-sm text-gray-600">Admin: admin@test.com / password</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">ExamSpace</h1>
              <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {user.role === "admin" ? "Admin" : "Student"}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {user.role === "admin" ? (
        <AdminDashboard user={user} />
      ) : (
        <StudentDashboard user={user} />
      )}
    </div>
  );
};

export default Index;
