'use client'

import type React from "react"
import Link from "next/link"
import { Home, BarChart, Settings, Users, Mail, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// const links = [
//   {
//     label: 'Task dashboard',
//     href: 'tasks',
//   },
//   {
//     label: 'Table of participants',
//     href: 'participants',
//   },
//   {
//     label: 'Docs',
//     href: 'docs',
//   },
// ];


interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  isActive?: boolean
}

interface VerticalNavbarProps {
  className?: string
}

export function VerticalNavbar({ className }: VerticalNavbarProps) {
  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-4 w-4" />,
      isActive: true,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      title: "Team",
      href: "/team",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: <Mail className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      title: "Help",
      href: "/help",
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ]

  return (
    <nav className={cn("flex h-full w-16 flex-col items-center border-r bg-background py-4", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <span className="text-lg font-bold">V</span>
      </div>
      <div className="mt-8 flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <Button
            key={item.title}
            variant={item.isActive ? "secondary" : "ghost"}
            size="icon"
            className="h-10 w-10 rounded-full"
            asChild
          >
            <Link href={item.href} title={item.title}>
              {item.icon}
              <span className="sr-only">{item.title}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}

