"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Bell,
  Shield,
  Save,
  Lock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Languages,
  Moon,
  Sun,
  LogOut,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Profile {
  name: string
  email: string
  phone: string
  address: string
  emergencyContact: string
  bloodGroup: string
  dateOfBirth: string
}

interface NotificationSettings {
  email: boolean
  sms: boolean
  announcements: boolean
  maintenance: boolean
  mealUpdates: boolean
  roomUpdates: boolean
  documentUpdates: boolean
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  lastLogin: string
  loginHistory: {
    date: string
    device: string
    location: string
  }[]
}

interface Preferences {
  theme: "light" | "dark" | "system"
  language: string
  timezone: string
  dateFormat: string
}

export function StudentSettings() {
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123, Hostel Block A, University Campus",
    emergencyContact: "+91 9876543211",
    bloodGroup: "O+",
    dateOfBirth: "2000-01-01",
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    sms: true,
    announcements: true,
    maintenance: true,
    mealUpdates: true,
    roomUpdates: true,
    documentUpdates: true,
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    lastPasswordChange: "2024-01-01",
    lastLogin: "2024-03-15 14:30",
    loginHistory: [
      {
        date: "2024-03-15 14:30",
        device: "Chrome on Windows",
        location: "New Delhi, India",
      },
      {
        date: "2024-03-14 10:15",
        device: "Safari on iPhone",
        location: "Mumbai, India",
      },
    ],
  })

  const [preferences, setPreferences] = useState<Preferences>({
    theme: "system",
    language: "en",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
  })

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully")
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    toast.success("Password updated successfully")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleTwoFactorToggle = () => {
    setSecurity({
      ...security,
      twoFactorEnabled: !security.twoFactorEnabled,
    })
    toast.success(
      `Two-factor authentication ${!security.twoFactorEnabled ? "enabled" : "disabled"}`
    )
  }

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  const handlePreferenceChange = (key: keyof Preferences, value: string) => {
    setPreferences({
      ...preferences,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+91 9876543210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                placeholder="Your current address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={profile.emergencyContact}
                onChange={(e) =>
                  setProfile({ ...profile, emergencyContact: e.target.value })
                }
                placeholder="Emergency contact number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select
                value={profile.bloodGroup}
                onValueChange={(value) =>
                  setProfile({ ...profile, bloodGroup: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) =>
                  setProfile({ ...profile, dateOfBirth: e.target.value })
                }
              />
            </div>
            <Button className="w-full" onClick={handleProfileUpdate}>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>
              Configure your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={() => handleNotificationToggle("email")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via SMS
                </p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={() => handleNotificationToggle("sms")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Announcement Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new announcements
                </p>
              </div>
              <Switch
                checked={notifications.announcements}
                onCheckedChange={() => handleNotificationToggle("announcements")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about maintenance work
                </p>
              </div>
              <Switch
                checked={notifications.maintenance}
                onCheckedChange={() => handleNotificationToggle("maintenance")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Meal Plan Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about meal plan changes
                </p>
              </div>
              <Switch
                checked={notifications.mealUpdates}
                onCheckedChange={() => handleNotificationToggle("mealUpdates")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Room Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about room changes
                </p>
              </div>
              <Switch
                checked={notifications.roomUpdates}
                onCheckedChange={() => handleNotificationToggle("roomUpdates")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Document Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about document status changes
                </p>
              </div>
              <Switch
                checked={notifications.documentUpdates}
                onCheckedChange={() => handleNotificationToggle("documentUpdates")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>
              Manage your security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Switch
                checked={security.twoFactorEnabled}
                onCheckedChange={handleTwoFactorToggle}
              />
            </div>
            <Button className="w-full" onClick={handlePasswordChange}>
              <Save className="mr-2 h-4 w-4" />
              Update Security
            </Button>
            <Separator className="my-4" />
            <div className="space-y-2">
              <Label>Login History</Label>
              <div className="space-y-2">
                {security.loginHistory.map((login, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{login.device}</p>
                      <p className="text-sm text-muted-foreground">
                        {login.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {login.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Preferences</CardTitle>
            </div>
            <CardDescription>
              Customize your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) =>
                  handlePreferenceChange("theme", value as "light" | "dark" | "system")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center">
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center">
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="bn">Bengali</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => handlePreferenceChange("timezone", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                  <SelectItem value="America/New_York">New York (EST)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) => handlePreferenceChange("dateFormat", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 