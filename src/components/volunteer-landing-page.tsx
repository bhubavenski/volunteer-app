import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Users, Globe, ArrowRight } from 'lucide-react'
import { ProgramCard } from './components/program-card'

export default function VolunteerLandingPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setName('')
    setEmail('')
    setMessage('')
  }

  const programs = [
    {
      title: "Почистване на парк 'Витоша'",
      description: "Помогнете за опазването на природата в най-големия парк на София.",
      date: "15 Юни 2025",
      location: "София, България",
      imageUrl: "/placeholder.svg?height=300&width=400"
    },
    {
      title: "Помощ в дом за възрастни хора",
      description: "Прекарайте време с възрастни хора и им помогнете в ежедневните дейности.",
      date: "20 Юни 2025",
      location: "Пловдив, България",
      imageUrl: "/placeholder.svg?height=300&width=400"
    },
    {
      title: "Образователен семинар за деца",
      description: "Проведете интерактивен урок по наука за деца от местното училище.",
      date: "1 Юли 2025",
      location: "Варна, България",
      imageUrl: "/placeholder.svg?height=300&width=400"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ДоброволциБГ</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#programs" className="hover:underline">Програми</a></li>
              <li><a href="#benefits" className="hover:underline">Ползи</a></li>
              <li><a href="#signup" className="hover:underline">Запиши се</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Направи света по-добър с нас!</h2>
            <p className="text-xl mb-8">Открий вдъхновяващи доброволчески програми и се присъедини към нашата общност.</p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Разгледай програмите
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section id="programs" className="py-16 bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Нашите програми</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Грижа за природата", icon: Globe },
                { title: "Помощ за възрастни хора", icon: Heart },
                { title: "Образователни инициативи", icon: Users }
              ].map((program, index) => (
                <div key={index} className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
                  <program.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                  <p className="text-muted-foreground">Присъедини се към нашата програма и направи реална промяна в обществото.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Предстоящи доброволчески програми</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <ProgramCard key={index} {...program} />
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-16 bg-background">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Ползи от доброволчеството</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Придобиване на нови умения",
                "Разширяване на социалната мрежа",
                "Подобряване на CV-то",
                "Принос към обществото"
              ].map((benefit, index) => (
                <li key={index} className="bg-muted rounded-lg p-4 shadow">
                  <p className="font-medium">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="signup" className="py-16 bg-muted">
          <div className="container mx-auto max-w-md">
            <h2 className="text-3xl font-bold text-center mb-8">Запиши се сега</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Вашето име"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Вашият имейл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Textarea
                placeholder="Съобщение (по желание)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" className="w-full">Изпрати</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 ДоброволциБГ. Всички права запазени.</p>
        </div>
      </footer>
    </div>
  )
}

