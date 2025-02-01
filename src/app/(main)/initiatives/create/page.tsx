import { Metadata } from "next"
import { CreateInitiativeForm } from "./components/CreateInitiativeForm"
import { AdminProtected } from "./components/AdminProtected"

export const metadata: Metadata = {
  title: "Създаване на инициатива | ДоброволциБГ",
  description: "Създайте нова доброволческа инициатива",
}

export default function CreateInitiativePage() {
  return (
    <AdminProtected>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Създаване на нова инициатива</h1>
        <CreateInitiativeForm />
      </div>
    </AdminProtected>
  )
}

