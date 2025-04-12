import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  participations: number
  lastParticipation: string
}

const initialVolunteers: Volunteer[] = [
  { id: "1", name: "Иван Иванов", email: "ivan@example.com", phone: "0888123456", participations: 5, lastParticipation: "2023-05-15" },
  { id: "2", name: "Мария Петрова", email: "maria@example.com", phone: "0889987654", participations: 3, lastParticipation: "2023-06-01" },
  { id: "3", name: "Георги Димитров", email: "georgi@example.com", phone: "0877456789", participations: 7, lastParticipation: "2023-06-10" },
]

export function VolunteersManagement() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newVolunteer, setNewVolunteer] = useState<Partial<Volunteer>>({})

  const handleCreateVolunteer = () => {
    if (newVolunteer.name && newVolunteer.email) {
      setVolunteers([...volunteers, { ...newVolunteer, id: Date.now().toString(), participations: 0, lastParticipation: "-" } as Volunteer])
      setNewVolunteer({})
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Управление на доброволци</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Добави нов доброволец</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добави нов доброволец</DialogTitle>
              <DialogDescription>Попълнете информацията за новия доброволец тук.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Име
                </Label>
                <Input
                  id="name"
                  value={newVolunteer.name || ""}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Имейл
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newVolunteer.email || ""}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Телефон
                </Label>
                <Input
                  id="phone"
                  value={newVolunteer.phone || ""}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateVolunteer}>Добави доброволец</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Име</TableHead>
            <TableHead>Имейл</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Брой участия</TableHead>
            <TableHead>Последно участие</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {volunteers.map((volunteer) => (
            <TableRow key={volunteer.id}>
              <TableCell>{volunteer.name}</TableCell>
              <TableCell>{volunteer.email}</TableCell>
              <TableCell>{volunteer.phone}</TableCell>
              <TableCell>{volunteer.participations}</TableCell>
              <TableCell>{volunteer.lastParticipation}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">
                  Редактирай
                </Button>
                <Button variant="destructive">Премахни</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

