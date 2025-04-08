"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Settings } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getSystemSettings } from "./SettingsServer"
import { useSaveSystemSettings } from "./SettingsMutation"
import { useEffect, useState } from "react"

interface SystemSettings {
  systemId: string;
  systemName: string;
  systemEmail: string;
  sytemMaintenanceMode: boolean;
  SMTPHost: string;
  SMTPPort: string;
  SMTPUser: string;
  SMTPPassword: string;
  passwordPolicy: boolean;
  twoFactorAuth: boolean;
  sessionDuration: number;
  academicYear: string;
}

export function SystemSettings() {
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    systemId: "",
    systemName: "",
    systemEmail: "",
    sytemMaintenanceMode: false,
    SMTPHost: "",
    SMTPPort: "",
    SMTPUser: "",
    SMTPPassword: "",
    passwordPolicy: false,
    twoFactorAuth: false,
    sessionDuration: 0,
    academicYear: "",
  });

  const {data: settingsData, isLoading: isSettingsLoading} = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSystemSettings()
  });

  useEffect(() => {
    if (settingsData?.data) {
      const data = settingsData.data;
      setSystemSettings({
        systemId: data.systemId || "",
        systemName: data.systemName || "",
        systemEmail: data.systemEmail || "",
        SMTPHost: data.SMTPHost || "",
        SMTPPort: data.SMTPPort?.toString() || "",
        SMTPUser: data.SMTPUser || "",
        SMTPPassword: data.SMTPPassword || "",
        sessionDuration: Number(data.sessionDuration) || 0,
        academicYear: data.academicYear?.toString() || "",
        sytemMaintenanceMode: data.sytemMaintenanceMode || false,
        passwordPolicy: data.passwordPolicy || false,
        twoFactorAuth: data.twoFactorAuth || false,
      });
    }
  }, [settingsData]);
  
  const {saveSettings, isPending} = useSaveSystemSettings();
  const handleSaveSettings = async () => {
    const data = JSON.stringify(systemSettings);
    await saveSettings(data);
  }

  if(isSettingsLoading || isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-muted-foreground">
          Configure global system parameters and preferences
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-name">System Name</Label>
            <Input
              id="system-name"
              onChange={(e) => setSystemSettings({...systemSettings, systemName : e.target.value})}
              value={systemSettings.systemName}
              placeholder="Enter system name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input
              id="contact-email"
              type="email"
              onChange={(e) => setSystemSettings({...systemSettings, systemEmail : e.target.value})}
              value={systemSettings.systemEmail}
              placeholder="Enter contact email"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
            <Switch 
              id="maintenance-mode" 
              checked={systemSettings.sytemMaintenanceMode} 
              onCheckedChange={(checked) => setSystemSettings({...systemSettings, sytemMaintenanceMode: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smtp-server">SMTP Server</Label>
            <Input
              id="smtp-server"
              value={systemSettings.SMTPHost}
              onChange={(e) => setSystemSettings({...systemSettings, SMTPHost : e.target.value})}
              placeholder="Enter SMTP server"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-port">SMTP Port</Label>
            <Input
              id="smtp-port"
              type="number"
              value={systemSettings.SMTPPort}
              onChange={(e) => setSystemSettings({...systemSettings, SMTPPort : e.target.value})}
              placeholder="Enter SMTP port"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-username">SMTP Username</Label>
            <Input
              id="smtp-username"
              value={systemSettings.SMTPUser}
              onChange={(e) => setSystemSettings({...systemSettings, SMTPUser : e.target.value})}
              placeholder="Enter SMTP username"
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            <Switch 
              id="two-factor" 
              checked={systemSettings.twoFactorAuth} 
              onCheckedChange={(checked) => setSystemSettings({...systemSettings, twoFactorAuth : checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password-policy">Password Policy</Label>
            <Switch 
              id="password-policy" 
              checked={systemSettings.passwordPolicy} 
              onCheckedChange={(checked) => setSystemSettings({...systemSettings, passwordPolicy : checked})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={systemSettings.sessionDuration}
              onChange={(e) => setSystemSettings({
                ...systemSettings,
                sessionDuration: Number(e.target.value)
              })}
              placeholder="Enter session timeout"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isPending}>
          <Settings className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
} 