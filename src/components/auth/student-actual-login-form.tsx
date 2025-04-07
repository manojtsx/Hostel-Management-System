"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export function StudentLoginForm() {
  const { id } = useParams()
  const [user, setUser] = useState({
    id: id,
    email: "",
    password: "",
    role: "Student"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter()

  // Load saved credentials on component mount
  useEffect(() => {
    if (id) {
      const savedEmail = localStorage.getItem(`student_email_${id}`);
      const savedPassword = localStorage.getItem(`student_password_${id}`);
      const savedRemember = localStorage.getItem(`student_remember_${id}`) === "true";
      
      if (savedRemember && savedEmail && savedPassword) {
        setUser(prev => ({
          ...prev,
          email: savedEmail,
          password: savedPassword,
        }));
        setRemember(true);
      }
    }
  }, [id]);

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRemember(isChecked);
    
    if (!isChecked && id) {
      // Clear saved credentials if remember me is unchecked
      localStorage.removeItem(`student_email_${id}`);
      localStorage.removeItem(`student_password_${id}`);
      localStorage.removeItem(`student_remember_${id}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // validate the form
    if (!user.email || !user.password) {
      setError("Please enter your email and password")
      return
    }

    // validate the email properly
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await signIn("credentials", {
        hostelNumber: user.id,
        email: user.email,
        password: user.password,
        redirect: false,
        role: "Student"
      })
      if (response?.error) {
        setError(response.error)
      } else {
        toast.success("Login successful. Redirecting to student dashboard...");
        // Save credentials if remember me is checked
        if (remember && id) {
          localStorage.setItem(`student_email_${id}`, user.email);
          localStorage.setItem(`student_password_${id}`, user.password);
          localStorage.setItem(`student_remember_${id}`, "true");
        } else if (id) {
          // Clear saved credentials if remember me is unchecked
          localStorage.removeItem(`student_email_${id}`);
          localStorage.removeItem(`student_password_${id}`);
          localStorage.removeItem(`student_remember_${id}`);
        }
        router.push("/student/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Student Portal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500">{error}</p>}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  value={user.password}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="rounded"
                    checked={remember}
                    onChange={handleRememberChange}
                  />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                New student?{" "}
                <Link href="/student/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 