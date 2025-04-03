import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Building2, GraduationCap, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Hostel Management System
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your hostel management process with our comprehensive solution. 
            Easy to use, secure, and efficient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/student/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/admin/login">
              <Button size="lg" variant="outline">Admin Login</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center">Hostel Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Efficiently manage rooms, allocations, and maintenance requests
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center">Student Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Easy access to room details, payments, and maintenance requests
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center">Academic Integration</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Seamless integration with student academic records
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center">Secure Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Role-based access control and secure authentication
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using our platform to manage their hostel experience.
          </p>
          <Link href="/student/register">
            <Button size="lg">Register Now</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
