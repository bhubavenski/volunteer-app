import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationsCommunication() {
  const [notificationType, setNotificationType] = useState("email")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSendNotification = () => {
    // Here you would implement the actual sending logic
    alert("Notification sent successfully!")
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Известия и комуникация</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="notification-type">Тип известие</Label>
          <Select onValueChange={setNotificationType} defaultValue={notificationType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Изберете тип известие" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Имейл</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {notificationType === "email" && (
          <div>
            <Label htmlFor="subject">Тема</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Въведете тема на съобщението"
            />
          </div>
        )}
        <div>
          <Label htmlFor="message">Съобщение</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Въведете текст на съобщението"
            rows={5}
          />
        </div>
        <Button onClick={handleSendNotification}>Изпрати известие</Button>
      </div>
    </div>
  )
}

