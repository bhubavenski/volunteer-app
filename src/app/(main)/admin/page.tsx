import { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for VolunteerBG",
}

export default function AdminPage() {
  return <AdminDashboard />
}

