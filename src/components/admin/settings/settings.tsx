"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  User,
  Bell,
  Shield,
  Building,
  Save,
  Mail,
  Lock,
  Calendar,
  CreditCard,
  FileText,
  Globe,
  Database,
  AlertCircle,
  Phone,
  MapPin,
  Languages,
  LogOut,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface HostelSettings {
  name: string
  address: string
  contactEmail: string
  contactPhone: string
  capacity: number
  checkInTime: string
  checkOutTime: string
  currency: string
  timezone: string
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  paymentAlerts: boolean
  maintenanceAlerts: boolean
  newBookingAlerts: boolean
  checkInAlerts: boolean
  checkOutAlerts: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordExpiry: number
  failedLoginAttempts: number
}

interface SystemSettings {
  backupFrequency: string
  backupLocation: string
  dataRetention: number
  maintenanceMode: boolean
}

interface Profile {
  name: string
  email: string
  phone: string
  address: string
  emergencyContact: string
  bloodGroup: string
  dateOfBirth: string
}

interface Preferences {
  language: string
  timezone: string
  dateFormat: string
}

export function SettingsManagement() {
  const [hostelSettings, setHostelSettings] = useState<HostelSettings>({
    name: "My Hostel",
    address: "123 Main St",
    contactEmail: "contact@myhostel.com",
    contactPhone: "+1234567890",
    capacity: 100,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    currency: "USD",
    timezone: "UTC",
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    paymentAlerts: true,
    maintenanceAlerts: true,
    newBookingAlerts: true,
    checkInAlerts: true,
    checkOutAlerts: true,
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    failedLoginAttempts: 5,
  })

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    backupFrequency: "daily",
    backupLocation: "local",
    dataRetention: 365,
    maintenanceMode: false,
  })

  const [profile, setProfile] = useState<Profile>({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1234567890",
    address: "123 Admin Street, City",
    emergencyContact: "+0987654321",
    bloodGroup: "O+",
    dateOfBirth: "1990-01-01",
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    paymentAlerts: true,
    maintenanceAlerts: true,
    newBookingAlerts: true,
    checkInAlerts: true,
    checkOutAlerts: true,
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    failedLoginAttempts: 5,
  })

  const [preferences, setPreferences] = useState<Preferences>({
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  })

  const handleSaveSettings = (section: string) => {
    toast.success(`${section} settings saved successfully`)
  }

  const updateProfile = () => {
    toast.success("Profile updated successfully")
  }

  const updateNotifications = () => {
    toast.success("Notification settings updated successfully")
  }

  const updateSecurity = () => {
    toast.success("Security settings updated successfully")
  }

  const updatePreferences = () => {
    toast.success("Preferences updated successfully")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage hostel settings and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Hostel Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <CardTitle>Hostel Settings</CardTitle>
            </div>
            <CardDescription>
              Configure hostel information and policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hostelName">Hostel Name</Label>
              <Input
                id="hostelName"
                value={hostelSettings.name}
                onChange={(e) => setHostelSettings({ ...hostelSettings, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={hostelSettings.address}
                onChange={(e) => setHostelSettings({ ...hostelSettings, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={hostelSettings.contactEmail}
                  onChange={(e) => setHostelSettings({ ...hostelSettings, contactEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={hostelSettings.contactPhone}
                  onChange={(e) => setHostelSettings({ ...hostelSettings, contactPhone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkInTime">Check-in Time</Label>
                <Input
                  id="checkInTime"
                  type="time"
                  value={hostelSettings.checkInTime}
                  onChange={(e) => setHostelSettings({ ...hostelSettings, checkInTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOutTime">Check-out Time</Label>
                <Input
                  id="checkOutTime"
                  type="time"
                  value={hostelSettings.checkOutTime}
                  onChange={(e) => setHostelSettings({ ...hostelSettings, checkOutTime: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={hostelSettings.currency}
                  onValueChange={(value) => setHostelSettings({ ...hostelSettings, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={hostelSettings.timezone}
                  onValueChange={(value) => setHostelSettings({ ...hostelSettings, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                    <SelectItem value="IST">IST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => handleSaveSettings("Hostel")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Hostel Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
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
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                }
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
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about payment updates
                </p>
              </div>
              <Switch
                checked={notificationSettings.paymentAlerts}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, paymentAlerts: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive maintenance notifications
                </p>
              </div>
              <Switch
                checked={notificationSettings.maintenanceAlerts}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, maintenanceAlerts: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Booking Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new bookings
                </p>
              </div>
              <Switch
                checked={notificationSettings.newBookingAlerts}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, newBookingAlerts: checked })
                }
              />
            </div>
            <Button
              className="w-full"
              onClick={() => handleSaveSettings("Notification")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
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
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) =>
                  setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) =>
                  setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) =>
                  setSecuritySettings({ ...securitySettings, passwordExpiry: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="failedLoginAttempts">Failed Login Attempts</Label>
              <Input
                id="failedLoginAttempts"
                type="number"
                value={securitySettings.failedLoginAttempts}
                onChange={(e) =>
                  setSecuritySettings({ ...securitySettings, failedLoginAttempts: parseInt(e.target.value) })
                }
              />
            </div>
            <Button
              className="w-full"
              onClick={() => handleSaveSettings("Security")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <CardTitle>System Settings</CardTitle>
            </div>
            <CardDescription>
              Configure system preferences and maintenance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select
                value={systemSettings.backupFrequency}
                onValueChange={(value) =>
                  setSystemSettings({ ...systemSettings, backupFrequency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupLocation">Backup Location</Label>
              <Select
                value={systemSettings.backupLocation}
                onValueChange={(value) =>
                  setSystemSettings({ ...systemSettings, backupLocation: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Server</SelectItem>
                  <SelectItem value="cloud">Cloud Storage</SelectItem>
                  <SelectItem value="external">External Drive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataRetention">Data Retention (days)</Label>
              <Input
                id="dataRetention"
                type="number"
                value={systemSettings.dataRetention}
                onChange={(e) =>
                  setSystemSettings({ ...systemSettings, dataRetention: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode for system updates
                </p>
              </div>
              <Switch
                checked={systemSettings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSystemSettings({ ...systemSettings, maintenanceMode: checked })
                }
              />
            </div>
            <Button
              className="w-full"
              onClick={() => handleSaveSettings("System")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save System Settings
            </Button>
          </CardContent>
        </Card>

        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input
                  id="bloodGroup"
                  value={profile.bloodGroup}
                  onChange={(e) =>
                    setProfile({ ...profile, bloodGroup: e.target.value })
                  }
                />
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
              <Button onClick={updateProfile}>Update Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Button
                  variant={notifications.emailNotifications ? "default" : "outline"}
                  onClick={() =>
                    setNotificationSettings({
                      ...notifications,
                      emailNotifications: !notifications.emailNotifications,
                    })
                  }
                >
                  {notifications.emailNotifications ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Button
                  variant={notifications.smsNotifications ? "default" : "outline"}
                  onClick={() =>
                    setNotificationSettings({
                      ...notifications,
                      smsNotifications: !notifications.smsNotifications,
                    })
                  }
                >
                  {notifications.smsNotifications ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about payment updates
                  </p>
                </div>
                <Button
                  variant={notifications.paymentAlerts ? "default" : "outline"}
                  onClick={() =>
                    setNotificationSettings({
                      ...notifications,
                      paymentAlerts: !notifications.paymentAlerts,
                    })
                  }
                >
                  {notifications.paymentAlerts ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive maintenance notifications
                  </p>
                </div>
                <Button
                  variant={notifications.maintenanceAlerts ? "default" : "outline"}
                  onClick={() =>
                    setNotificationSettings({
                      ...notifications,
                      maintenanceAlerts: !notifications.maintenanceAlerts,
                    })
                  }
                >
                  {notifications.maintenanceAlerts ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Booking Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new bookings
                  </p>
                </div>
                <Button
                  variant={notifications.newBookingAlerts ? "default" : "outline"}
                  onClick={() =>
                    setNotificationSettings({
                      ...notifications,
                      newBookingAlerts: !notifications.newBookingAlerts,
                    })
                  }
                >
                  {notifications.newBookingAlerts ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <Button onClick={updateNotifications}>Update Notifications</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant={securitySettings.twoFactorAuth ? "default" : "outline"}
                  onClick={() =>
                    setSecuritySettings({
                      ...securitySettings,
                      twoFactorAuth: !securitySettings.twoFactorAuth,
                    })
                  }
                >
                  {securitySettings.twoFactorAuth ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Password Expiry (days)</Label>
                <Input
                  type="number"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, passwordExpiry: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Failed Login Attempts</Label>
                <Input
                  type="number"
                  value={securitySettings.failedLoginAttempts}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, failedLoginAttempts: parseInt(e.target.value) })
                  }
                />
              </div>
              <Button onClick={updateSecurity}>Update Security</Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={preferences.language}
                  onValueChange={(value) =>
                    setPreferences({ ...preferences, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select
                  value={preferences.timezone}
                  onValueChange={(value) =>
                    setPreferences({ ...preferences, timezone: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select
                  value={preferences.dateFormat}
                  onValueChange={(value) =>
                    setPreferences({ ...preferences, dateFormat: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={updatePreferences}>Update Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 