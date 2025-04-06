"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Hostel Management
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex ml-auto items-center space-x-4">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Do you want to be a Hostel Owner?</p>
            <Link href="/register/admin">
              <Button variant="ghost">Admin Registration Here</Button>
            </Link>
          </div>
          <Link href="/login">
            <Button variant="ghost">Student</Button>
          </Link>
          <Link href="/register/student">
            <Button>Register</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground px-4">Do you want to be a Hostel Owner?</p>
                  <Link href="/register/admin" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Admin Registration Here
                    </Button>
                  </Link>
                </div>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Student Login
                  </Button>
                </Link>
                <Link href="/register/student" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-start">
                    Register
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
