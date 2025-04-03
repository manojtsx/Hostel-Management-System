import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"
import { Building2, Users, BarChart3, Shield } from "lucide-react"
import Link from "next/link"

export default function AdminLogin() {
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
                Efficiently manage multiple hostels with our comprehensive system
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
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your email"
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
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded" />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button className="w-full">Login</Button>
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
  )
} 