'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, CalendarIcon, Users, Clock } from 'lucide-react'

export default function InitiativePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDialogOpen(false)
    setName('')
    setEmail('')
  }

  const initiativeDetails = {
    title: "Почистване на парк 'Витоша'",
    description: "Присъединете се към нас за ежегодното почистване на парк 'Витоша'. Заедно ще съберем отпадъци, ще обновим пътеките и ще помогнем за опазването на този прекрасен природен резерват. Елате с удобни обувки и ентусиазъм за една по-чиста околна среда!",
    date: new Date(2025, 5, 15), // 15 Юни 2025
    time: "09:00 - 14:00",
    location: "Парк 'Витоша', София, България",
    participants: 50,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ]
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{initiativeDetails.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {initiativeDetails.images.map((src, index) => (
                <CarouselItem key={index}>
                  <img src={src} alt={`Снимка ${index + 1} от инициативата`} className="w-full rounded-lg" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Детайли за инициативата</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{initiativeDetails.date.toLocaleDateString('bg-BG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{initiativeDetails.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{initiativeDetails.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{initiativeDetails.participants} участници</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Описание</h2>
        <p className="text-muted-foreground">{initiativeDetails.description}</p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Календар</h2>
          <Calendar
            mode="single"
            selected={initiativeDetails.date}
            className="rounded-md border"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Локация</h2>
          <div className="aspect-video rounded-lg bg-muted">
            {/* Тук може да се добави карта, ако има интеграция с карти */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Карта на локацията
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Запиши се за инициативата</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Запиши се за {initiativeDetails.title}</DialogTitle>
              <DialogDescription>
                Попълнете вашите данни, за да се запишете за тази инициатива.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Име
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Изпрати</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

