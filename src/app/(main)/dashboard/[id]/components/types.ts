// Тип за задача
export interface Task {
    id: string
    title: string
    description: string
    priority: "low" | "medium" | "high"
    assignee?: string
    sprintId: string | null
    status: "todo" | "in-progress" | "done" | null
    createdAt: string
  }
  
  // Тип за спринт
  export interface Sprint {
    id: string
    name: string
    startDate: string
    endDate: string
    goal: string
  }
  
  // Тип за колона в Kanban дъската
  export interface Column {
    id: "todo" | "in-progress" | "done"
    title: string
  }
  
  