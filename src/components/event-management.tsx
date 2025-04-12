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

interface Event {
  id: string
  title: string
  date: string
  location: string
  participants: number
}

const initialEvents: Event[] = [
  { id: "1", title: "Почистване на плаж", date: "2023-07-15", location: "Варна", participants: 30 },
  { id: "2", title: "Благотворителен базар", date: "2023-08-01", location: "София", participants: 50 },
  { id: "3", title: "Засаждане на дървета", date: "2023-09-10", location: "Пловдив", participants: 25 },
]

export function EventManagement() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({})

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location) {
      setEvents([...events, { ...newEvent, id: Date.now().toString(), participants: 0 } as Event])
      setNewEvent({})
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Управление на събития</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Създай ново събитие</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Създай ново събитие</DialogTitle>
              <DialogDescription>Попълнете детайлите за новото събитие тук.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Заглавие
                </Label>
                <Input
                  id="title"
                  value={newEvent.title || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Дата
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Локация
                </Label>
                <Input
                  id="location"
                  value={newEvent.location || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateEvent}>Създай събитие</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Заглавие</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Локация</TableHead>
            <TableHead>Брой участници</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.participants}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">
                  Редактирай
                </Button>
                <Button variant="outline" className="mr-2">
                  Експорт CSV
                </Button>
                <Button variant="destructive">Изтрий</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

