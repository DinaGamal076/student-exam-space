
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthFormProps {
  onAuth: (email: string, password: string, isLogin: boolean) => void;
  isLogin: boolean;
  onToggleMode: () => void;
}

export const AuthForm = ({ onAuth, isLogin, onToggleMode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(email, password, isLogin);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onToggleMode}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
