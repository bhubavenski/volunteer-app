"use client"

import { useState } from "react"
import { AdminNavbar } from "./admin-navbar"
import { Dashboard } from "./dashboard"
import { ProgramsManagement } from "./programs-management"
import { VolunteersManagement } from "./volunteers-management"
import { EventManagement } from "./event-management"
import { NotificationsCommunication } from "./notifications-communication"
import { ReportsAnalytics } from "./reports-analytics"
import { UserManagement } from "./user-management"
import { AppSettings } from "./app-settings"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "programs":
        return <ProgramsManagement />
      case "volunteers":
        return <VolunteersManagement />
      case "events":
        return <EventManagement />
      case "notifications":
        return <NotificationsCommunication />
      case "reports":
        return <ReportsAnalytics />
      case "users":
        return <UserManagement />
      case "settings":
        return <AppSettings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-8">{renderContent()}</main>
    </div>
  )
}

