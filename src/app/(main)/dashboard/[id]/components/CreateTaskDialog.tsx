"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Priority, Prisma } from "@prisma/client"
import { useParams } from "next/navigation"

interface CreateTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTask: (task: Prisma.TaskCreateInput) => void
}

export function CreateTaskDialog({ open, onOpenChange, onAddTask }: CreateTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState<Priority>('MID')
  const [assignee, setAssignee] = useState("")
  const { id } = useParams<{ id: string }>();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    const newTask: Prisma.TaskCreateInput = {
      title,
      description,
      category,
      priority,
      status: "TODO",
      initiative: {
        connect: {
          id,
        }
      }
    }
    console.log({newTask})
    onAddTask(newTask)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setPriority("MID")
    setAssignee("")
    setCategory("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Създаване на нова задача</DialogTitle>
            <DialogDescription>Добавете нова задача към backlog-а на проекта.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Заглавие</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Въведете заглавие на задачата"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Въведете описание на задачата"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Въведете категория на задачата ( по подразбиране е main )"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Приоритет</Label>
                <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Изберете приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Нисък</SelectItem>
                    <SelectItem value="MID">Среден</SelectItem>
                    <SelectItem value="HIGH">Висок</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Отговорник (незадължително)</Label>
                <Input
                  id="assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  placeholder="Име на отговорника"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отказ
            </Button>
            <Button type="submit">Създай задача</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

