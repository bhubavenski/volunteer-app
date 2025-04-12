import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { InitiativeData } from "../../types"
import { Progress } from "@/components/ui/progress"

export default function TaskProgress({
  initiativeData,
}: {
  initiativeData: InitiativeData
}) {
  const groupTasksByCategory = () => {
    // Check if initiativeData and tasks exist
    if (!initiativeData || !initiativeData.tasks || initiativeData.tasks.length === 0) {
      return []
    }

    // Create a map to store tasks grouped by category
    const categoriesMap = new Map()

    // Group tasks by category
    initiativeData.tasks.forEach((task) => {
      const category = task.category || "Uncategorized"

      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, {
          total: 0,
          completed: 0,
        })
      }

      const categoryData = categoriesMap.get(category)
      categoryData.total += 1

      // Increment completed count if task is completed
      if (task.status === 'DONE') {
        categoryData.completed += 1
      }
    })

    // Convert map to array and calculate percentages
    const result = Array.from(categoriesMap.entries()).map(([name, data]) => {
      const completedPercentage = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0

      return {
        name,
        completed: completedPercentage,
      }
    })

    return result
  }

  const categoryProgress = groupTasksByCategory()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Изпълнени задачи по категория</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryProgress.length > 0 ? (
            categoryProgress.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>{category.name}</span>
                  <span className="font-bold">{category.completed}%</span>
                </div>
                <Progress value={category.completed} className="h-2" />
              </div>
            ))
          ) : (
            <div>Няма налични задачи</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
