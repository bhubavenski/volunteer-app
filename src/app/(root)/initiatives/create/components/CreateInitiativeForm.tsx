"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Заглавието трябва да бъде поне 5 символа.",
  }),
  description: z.string().min(20, {
    message: "Описанието трябва да бъде поне 20 символа.",
  }),
  date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate > today;
  }, {
    message: "Датата трябва да бъде в бъдещето.",
  }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Моля, въведете валидно време (ЧЧ:ММ).",
  }),
  location: z.string().min(3, {
    message: "Локацията трябва да бъде поне 3 символа.",
  }),
  category: z.string().min(3, {
    message: "Категорията трябва да бъде поне 3 символа.",
  }),
  maxParticipants: z.number().min(1, {
    message: "Трябва да има поне 1 участник.",
  }),
})

export function CreateInitiativeForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      maxParticipants: 1,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Симулираме заявка към сървъра
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Инициативата е създадена успешно!",
        description: "Новата инициатива беше добавена в системата.",
      })

      router.push("/admin/initiatives")
    } catch (error) {
      toast({
        title: "Грешка при създаване на инициативата",
        description: "Моля, опитайте отново по-късно.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заглавие</FormLabel>
              <FormControl>
                <Input placeholder="Въведете заглавие на инициативата" {...field} />
              </FormControl>
              <FormDescription>
                Кратко и ясно заглавие на инициативата.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишете инициативата подробно"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Подробно описание на целите и дейностите на инициативата.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дата</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Време</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Локация</FormLabel>
              <FormControl>
                <Input placeholder="Въведете локация на инициативата" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категория</FormLabel>
              <FormControl>
                <Input placeholder="Въведете категория на инициативата" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Максимален брой участници</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Създаване..." : "Създай инициатива"}
        </Button>
      </form>
    </Form>
  )
}

