"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import Link from 'next/link'
import { AppLinks } from "@/constants/AppLinks"

interface Initiative {
  id: string
  title: string
  description: string
  date: string
  location: string
  category: string
}

const initiatives: Initiative[] = [
  {
    id: "1",
    title: "Почистване на парк 'Витоша'",
    description: "Помогнете за опазването на природата в най-големия парк на София.",
    date: "2025-06-15",
    location: "София",
    category: "Екология"
  },
  {
    id: "2",
    title: "Помощ в дом за възрастни хора",
    description: "Прекарайте време с възрастни хора и им помогнете в ежедневните дейности.",
    date: "2025-06-20",
    location: "Пловдив",
    category: "Социални дейности"
  },
  {
    id: "3",
    title: "Образователен семинар за деца",
    description: "Проведете интерактивен урок по наука за деца от местното училище.",
    date: "2025-07-01",
    location: "Варна",
    category: "Образование"
  },
  {
    id: "4",
    title: "Засаждане на дървета",
    description: "Помогнете за залесяването на градски район.",
    date: "2025-07-10",
    location: "Бургас",
    category: "Екология"
  },
  {
    id: "5",
    title: "Организиране на благотворителен базар",
    description: "Помогнете в организацията и провеждането на благотворителен базар.",
    date: "2025-07-15",
    location: "София",
    category: "Социални дейности"
  }
]

export default function InitiativesList() {
  const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>(initiatives)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
       
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInitiatives.map((initiative) => (
          <Card key={initiative.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{initiative.title}</CardTitle>
              <CardDescription>{initiative.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(initiative.date).toLocaleDateString('bg-BG')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                <MapPinIcon className="h-4 w-4" />
                <span>{initiative.location}</span>
              </div>
              <div className="mt-2 text-sm font-medium">{initiative.category}</div>
            </CardContent>
            <CardFooter>
              <Link href={`${AppLinks.INITIATIVES_LIST}/${initiative.id}`} className="w-full">
                <Button className="w-full">Детайли</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

