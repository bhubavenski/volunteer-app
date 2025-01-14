import { Button } from "@/components/ui/button"
import { LayoutDashboard, ClipboardList, Users, Calendar, Bell, BarChart2, UserCog, Settings } from 'lucide-react'

interface AdminNavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminNavbar({ activeTab, setActiveTab }: AdminNavbarProps) {
  const navItems = [
    { id: "dashboard", label: "Табло", icon: LayoutDashboard },
    { id: "programs", label: "Програми", icon: ClipboardList },
    { id: "volunteers", label: "Доброволци", icon: Users },
    { id: "events", label: "Събития", icon: Calendar },
    { id: "notifications", label: "Известия", icon: Bell },
    { id: "reports", label: "Отчети", icon: BarChart2 },
    { id: "users", label: "Потребители", icon: UserCog },
    { id: "settings", label: "Настройки", icon: Settings },
  ]

  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <ul className="space-y-2 p-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <Button
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

