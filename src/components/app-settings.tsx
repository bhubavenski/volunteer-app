import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AppSettings() {
  const [settings, setSettings] = useState({
    organizationName: "ДоброволциБГ",
    maxParticipants: "50",
    emailServer: "smtp.example.com",
    contactInfo: "info@dobrovolcibg.org\nтел: 0888 123 456",
  })

  const handleSaveSettings = () => {
    // Here you would implement the actual saving logic
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Настройки на приложението</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="organization-name">Име на организацията</Label>
          <Input
            id="organization-name"
            value={settings.organizationName}
            onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="max-participants">Максимален брой участници в програма</Label>
          <Input
            id="max-participants"
            type="number"
            value={settings.maxParticipants}
            onChange={(e) => setSettings({ ...settings, maxParticipants: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email-server">Имейл сървър</Label>
          <Input
            id="email-server"
            value={settings.emailServer}
            onChange={(e) => setSettings({ ...settings, emailServer: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="contact-info">Контактна информация</Label>
          <Textarea
            id="contact-info"
            value={settings.contactInfo}
            onChange={(e) => setSettings({ ...settings, contactInfo: e.target.value })}
            rows={4}
          />
        </div>
        <Button onClick={handleSaveSettings}>Запази настройките</Button>
      </div>
    </div>
  )
}

