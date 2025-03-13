"use client"

import { useMemo } from "react"
import { useDrag } from "react-dnd"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowRight, Clock } from "lucide-react"
import type { Task, Sprint } from "./types"

interface BacklogProps {
  tasks: Task[]
  sprints: Sprint[]
  onMoveToSprint: (taskId: string, sprintId: string) => void
}

export function Backlog({ tasks, sprints, onMoveToSprint }: BacklogProps) {
  // Сортиране на задачите по приоритет и дата на създаване
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [tasks])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Backlog</h2>
        <p className="text-sm text-muted-foreground">{tasks.length} задачи</p>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        {sortedTasks.map((task) => (
          <BacklogTaskCard key={task.id} task={task} sprints={sprints} onMoveToSprint={onMoveToSprint} />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">Няма задачи в backlog</p>
            <p className="text-sm text-muted-foreground mt-1">Добавете нови задачи с бутона "Нова задача"</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface BacklogTaskCardProps {
  task: Task
  sprints: Sprint[]
  onMoveToSprint: (taskId: string, sprintId: string) => void
}

function BacklogTaskCard({ task, sprints, onMoveToSprint }: BacklogTaskCardProps) {
  // Настройка на drag and drop
  const [{ isDragging }, drag] = useDrag({
    type: "BACKLOG_TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  // Форматиране на дата
  const formattedDate = new Date(task.createdAt).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <Card ref={drag} className={`cursor-move ${isDragging ? "opacity-50" : ""}`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Действия</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sprints.map((sprint) => (
                <DropdownMenuItem key={sprint.id} onClick={() => onMoveToSprint(task.id, sprint.id)}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Премести в {sprint.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2 mt-1">{task.description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center">
          <Badge
            variant="outline"
            className={
              task.priority === "high"
                ? "bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                : task.priority === "medium"
                  ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800"
                  : "bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
            }
          >
            {task.priority === "high" ? "Висок" : task.priority === "medium" ? "Среден" : "Нисък"} приоритет
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {formattedDate}
        </div>
      </CardFooter>
    </Card>
  )
}

