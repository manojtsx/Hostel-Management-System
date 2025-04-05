"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"
import { Building2, Users, BarChart3, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export function SuperAdminLoginForm() {
  const router = useRouter()  
  const [user, setUser] = useState({
    email : "",
    password : ""
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await signIn("credentials", {
        email : user.email,
        password : user.password,
        redirect : false
      })
      if(response?.error){
        setError(response.error)
      }else{
        router.push("/superadmin/dashboard")
      }
    } catch (error) {
      console.log(error)  
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Carousel */}
        <div className="hidden md:block">
          <Carousel className="h-full">
            {/* Keep image in background */}
            <div className="bg-primary/10 p-8 rounded-lg h-[500px] flex flex-col items-center justify-center text-center">
              {/* <Image src="/images/carousel-1.webp" alt="Super Admin Login Background" fill className="object-cover" /> */}
              <Building2 className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">System Administration</h3>
              <p className="text-muted-foreground">
                Complete control over the entire hostel management system
              </p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg h-[500px] flex flex-col items-center justify-center text-center">
              {/* <Image src="/images/carousel-2.jpg" alt="Super Admin Login Background" fill className="object-cover" /> */}
              <Users className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Admin Management</h3>
              <p className="text-muted-foreground">
                Manage hostel administrators and their permissions
              </p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg h-[500px] flex flex-col items-center justify-center text-center">
              {/* <Image src="/images/carousel-3.jpg" alt="Super Admin Login Background" fill className="object-cover" /> */}
              <BarChart3 className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">System Analytics</h3>
              <p className="text-muted-foreground">
                Access comprehensive system-wide analytics and reports
              </p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg h-[500px] flex flex-col items-center justify-center text-center">
              {/* <Image src="/images/carousel-4.jpg" alt="Super Admin Login Background" fill className="object-cover" /> */}
              <Settings className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">System Configuration</h3>
              <p className="text-muted-foreground">
                Configure system settings and global parameters
              </p>
            </div>
          </Carousel>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Super Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
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
                  name="password"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded" onClick={() => setRemember(!remember)} />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 