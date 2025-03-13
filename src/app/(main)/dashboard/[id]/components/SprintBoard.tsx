"use client"

import { useDrag, useDrop } from "react-dnd"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowLeft, ArrowRight, User } from "lucide-react"
import type { Task, Sprint, Column } from "./types"

interface SprintBoardProps {
  sprint: Sprint
  tasks: Task[]
  onMoveTask: (taskId: string, newStatus: "todo" | "in-progress" | "done") => void
  onMoveToBacklog: (taskId: string) => void
}

export function SprintBoard({ sprint, tasks, onMoveTask, onMoveToBacklog }: SprintBoardProps) {
  // Дефиниране на колоните
  const columns: Column[] = [
    { id: "todo", title: "TODO" },
    { id: "in-progress", title: "IN PROGRESS" },
    { id: "done", title: "DONE" },
  ]

  // Форматиране на дати
  const formattedStartDate = new Date(sprint.startDate).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  const formattedEndDate = new Date(sprint.endDate).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  // Групиране на задачи по статус
  const tasksByStatus = {
    todo: tasks.filter((task) => task.status === "todo"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    done: tasks.filter((task) => task.status === "done"),
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{sprint.name}</h2>
          <Badge variant="outline">
            {formattedStartDate} - {formattedEndDate}
          </Badge>
        </div>
        <p className="text-muted-foreground">{sprint.goal}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={tasksByStatus[column.id]}
            onMoveTask={onMoveTask}
            onMoveToBacklog={onMoveToBacklog}
            otherColumns={columns.filter((c) => c.id !== column.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface BoardColumnProps {
  column: Column
  tasks: Task[]
  onMoveTask: (taskId: string, newStatus: "todo" | "in-progress" | "done") => void
  onMoveToBacklog: (taskId: string) => void
  otherColumns: Column[]
}

function BoardColumn({ column, tasks, onMoveTask, onMoveToBacklog, otherColumns }: BoardColumnProps) {
  // Настройка на drop target
  const [{ isOver }, drop] = useDrop({
    accept: ["SPRINT_TASK", "BACKLOG_TASK"],
    drop: (item: { id: string; status?: string }) => {
      console.log(`Dropping task ${item.id} into column ${column.id}`)
      onMoveTask(item.id, column.id)
      return { moved: true }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div
      ref={drop}
      className={`bg-muted/40 rounded-lg p-3 h-[600px] overflow-y-auto flex flex-col ${
        isOver ? "ring-2 ring-primary/20" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-muted/40 z-10 py-2">
        <h3 className="font-medium">{column.title}</h3>
        <Badge>{tasks.length}</Badge>
      </div>

      <div className="space-y-3 overflow-y-auto flex-grow pr-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onMoveToBacklog={onMoveToBacklog}
            otherColumns={otherColumns}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex items-center justify-center p-4 border border-dashed rounded-lg bg-background/50 h-20">
            <p className="text-sm text-muted-foreground">Няма задачи</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface TaskCardProps {
  task: Task
  onMoveTask: (taskId: string, newStatus: "todo" | "in-progress" | "done") => void
  onMoveToBacklog: (taskId: string) => void
  otherColumns: Column[]
}

function TaskCard({ task, onMoveTask, onMoveToBacklog, otherColumns }: TaskCardProps) {
  // Настройка на drag and drop
  const [{ isDragging }, drag] = useDrag({
    type: "SPRINT_TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <Card ref={drag} className={`cursor-move ${isDragging ? "opacity-50" : ""}`}>
      <CardHeader className="p-3 pb-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm">{task.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
                <span className="sr-only">Действия</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {otherColumns.map((column) => (
                <DropdownMenuItem key={column.id} onClick={() => onMoveTask(task.id, column.id)}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Премести в {column.title}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => onMoveToBacklog(task.id)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Върни в Backlog
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="p-3 pt-0 flex justify-between">
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
          {task.priority === "high" ? "Висок" : task.priority === "medium" ? "Среден" : "Нисък"}
        </Badge>
        {task.assignee && (
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="mr-1 h-3 w-3" />
            {task.assignee}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

