"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import { Building2, Users, BarChart3, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function AdminLogin() {
  // get the id from the url
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState({
    id: id,
    email: "",
    password: "",
    role: "Admin",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  // Load saved credentials on component mount
  useEffect(() => {
    if (id) {
      const savedEmail = localStorage.getItem(`admin_email_${id}`);
      const savedPassword = localStorage.getItem(`admin_password_${id}`);
      const savedRemember = localStorage.getItem(`admin_remember_${id}`) === "true";
      
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
      localStorage.removeItem(`admin_email_${id}`);
      localStorage.removeItem(`admin_password_${id}`);
      localStorage.removeItem(`admin_remember_${id}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // validate the form
    if (!user.email || !user.password) {
      setError("Please enter your email and password");
      return;
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
        role : "Admin",
        redirect: false,
      });
      
      if (response?.error) {
        setError(response.error);
      } else {
        toast.success("Login successful. Redirecting to admin dashboard...");
        // Save credentials if remember me is checked
        if (remember && id) {
          localStorage.setItem(`admin_email_${id}`, user.email);
          localStorage.setItem(`admin_password_${id}`, user.password);
          localStorage.setItem(`admin_remember_${id}`, "true");
        } else if (id) {
          // Clear saved credentials if remember me is unchecked
          localStorage.removeItem(`admin_email_${id}`);
          localStorage.removeItem(`admin_password_${id}`);
          localStorage.removeItem(`admin_remember_${id}`);
        }
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Carousel */}
        <div className="hidden md:block">
          <Carousel className="h-full">
            <div className="bg-primary/10 p-8 rounded-lg h-[500px] flex flex-col items-center justify-center text-center">
              <Building2 className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Manage Hostels</h3>
              <p className="text-muted-foreground">
                Efficiently manage multiple hostels with our comprehensive
                system
              </p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg h-[500px] flex flex-col items-center justify-center text-center">
              <Users className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Student Management</h3>
              <p className="text-muted-foreground">
                Track student details and manage room assignments
              </p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg h-[500px] flex flex-col items-center justify-center text-center">
              <BarChart3 className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Analytics & Reports</h3>
              <p className="text-muted-foreground">
                Get insights with detailed analytics and reports
              </p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg h-[500px] flex flex-col items-center justify-center text-center">
              <Shield className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Secure Access</h3>
              <p className="text-muted-foreground">
                Role-based access control for enhanced security
              </p>
            </div>
          </Carousel>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
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
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Contact your administrator
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
