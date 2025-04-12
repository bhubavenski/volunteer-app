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

interface Program {
  id: string
  title: string
  date: string
  participants: number
  status: "active" | "completed" | "upcoming"
}

const initialPrograms: Program[] = [
  { id: "1", title: "Почистване на парк", date: "2023-06-15", participants: 20, status: "upcoming" },
  { id: "2", title: "Помощ в старчески дом", date: "2023-05-20", participants: 15, status: "completed" },
  { id: "3", title: "Засаждане на дървета", date: "2023-07-01", participants: 30, status: "active" },
]

export function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProgram, setNewProgram] = useState<Partial<Program>>({})

  const handleCreateProgram = () => {
    if (newProgram.title && newProgram.date) {
      setPrograms([...programs, { ...newProgram, id: Date.now().toString(), participants: 0, status: "upcoming" } as Program])
      setNewProgram({})
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Управление на програми</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Създай нова програма</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Създай нова програма</DialogTitle>
              <DialogDescription>Попълнете детайлите за новата програма тук.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Заглавие
                </Label>
                <Input
                  id="title"
                  value={newProgram.title || ""}
                  onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
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
                  value={newProgram.date || ""}
                  onChange={(e) => setNewProgram({ ...newProgram, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateProgram}>Създай програма</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Заглавие</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Брой участници</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.map((program) => (
            <TableRow key={program.id}>
              <TableCell>{program.title}</TableCell>
              <TableCell>{program.date}</TableCell>
              <TableCell>{program.participants}</TableCell>
              <TableCell>{program.status}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">
                  Редактирай
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

