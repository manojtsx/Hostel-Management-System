import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Hostel Management
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/superadmin/login">
            <Button variant="ghost">Super Admin</Button>
          </Link>
          <Link href="/admin/login">
            <Button variant="ghost">Admin</Button>
          </Link>
          <Link href="/student/login">
            <Button variant="ghost">Student</Button>
          </Link>
          <Link href="/student/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
} 