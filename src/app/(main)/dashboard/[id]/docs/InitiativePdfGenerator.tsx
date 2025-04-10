"use client"

import type React from "react"
import { useState, useEffect,  memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { bg } from "date-fns/locale"
import { CalendarIcon, Search, FileText, Download, Trash2, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Font } from "@react-pdf/renderer"
import type { InitiativePDF, Prisma } from "@prisma/client"
import { createInitiativePDF, getInitiativePDFs, deleteInitiativePDF } from "@/actions/pdf.actions"
import { useToast } from "@/hooks/use-toast"

// В началото на файла
Font.register({
  family: "Roboto",
  src: "/fonts/Roboto-Regular.ttf", // път от `public`
})

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column" as const,
    backgroundColor: "#fff",
    padding: 30,
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold" as const,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    marginBottom: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  date: {
    fontSize: 12,
    marginBottom: 10,
  },
})

// PDF Document Component
interface InitiativePDFDocumentProps {
  data: InitiativePDF | Prisma.InitiativePDFCreateInput
}

const InitiativePDFDocument: React.FC<InitiativePDFDocumentProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>Дата: {format(new Date(data.date), "dd.MM.yyyy")}</Text>

        <Text style={styles.subtitle}>Описание:</Text>
        <Text style={styles.text}>{data.description}</Text>

        <Text style={styles.subtitle}>Организатор:</Text>
        <Text style={styles.text}>{data.organizer}</Text>

        {data.location && (
          <>
            <Text style={styles.subtitle}>Локация:</Text>
            <Text style={styles.text}>{data.location}</Text>
          </>
        )}

        {data.contact && (
          <>
            <Text style={styles.subtitle}>Контакт:</Text>
            <Text style={styles.text}>{data.contact}</Text>
          </>
        )}

        {data.additionalInfo && (
          <>
            <Text style={styles.subtitle}>Допълнителна информация:</Text>
            <Text style={styles.text}>{data.additionalInfo}</Text>
          </>
        )}
      </View>
    </Page>
  </Document>
)

// Тип за формуляра, без id и createdAt
type InitiativeFormData = {
  title: string
  description: string
  organizer: string
  location: string
  contact: string
  additionalInfo: string
  date: Date
}

// Мемоизиран компонент за PDF изтегляне, за да предотвратим ненужни ререндерирания
interface StablePDFDownloadProps {
  formData: InitiativeFormData
  selectedPdf: InitiativePDF | null
  isFormComplete: boolean
}

const StablePDFDownload = memo(({ formData, selectedPdf, isFormComplete }: StablePDFDownloadProps) => {
  // Type for the render prop function in PDFDownloadLink
  type RenderPDFLinkProps = {
    loading: boolean
    error: Error | null
  }

  const buttonClass = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2",
    isFormComplete
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
  )

  if (!isFormComplete) {
    return (
      <button className={buttonClass} disabled>
        Изтегли PDF
      </button>
    )
  }

  return (
    <PDFDownloadLink
      document={
        <InitiativePDFDocument
          data={{
            ...formData,
            id: selectedPdf?.id || `temp-${Date.now()}`,
            createdAt: selectedPdf?.createdAt || new Date(),
          }}
        />
      }
      fileName={`${formData.title.replace(/\s+/g, "-")}-initiative.pdf`}
      className={buttonClass}
    >
      {({ loading, error }: RenderPDFLinkProps) => {
        if (error) {
          return "Грешка"
        }
        return loading ? "Подготовка..." : "Изтегли PDF"
      }}
    </PDFDownloadLink>
  )
})

StablePDFDownload.displayName = "StablePDFDownload"

export function InitiativePdfGenerator(): React.ReactElement {
  const { toast } = useToast()

  const emptyFormData: InitiativeFormData = {
    title: "",
    description: "",
    organizer: "",
    location: "",
    contact: "",
    additionalInfo: "",
    date: new Date(),
  }

  const [formData, setFormData] = useState<InitiativeFormData>(emptyFormData)
  const debouncedFormData = useDebounce(formData, 300)
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false)
  const [history, setHistory] = useState<InitiativePDF[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedPdf, setSelectedPdf] = useState<InitiativePDF | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({})

  // Load PDFs from database on component mount
  useEffect(() => {
    const fetchPDFs = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const result = await getInitiativePDFs()
        if (result.success) {
          setHistory(result.data)
        } else {
          toast({
            title: "Грешка при зареждане",
            description: result.error,
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error)
        toast({
          title: "Грешка при зареждане",
          description: "Възникна проблем при зареждане на документите",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPDFs()
  }, [toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Date | undefined): void => {
    setFormData((prev) => ({
      ...prev,
      date: date || new Date(),
    }))
  }

  useEffect(() => {
    const requiredFields: Array<keyof Pick<InitiativeFormData, "title" | "description" | "organizer">> = [
      "title",
      "description",
      "organizer",
    ]

    const isComplete = requiredFields.every((field) => debouncedFormData[field].toString().trim() !== "")
    setIsFormComplete(isComplete)
  }, [debouncedFormData])

  const handleSavePdf = async (): Promise<void> => {
    if (!isFormComplete) return

    setIsSaving(true)
    try {
      const result = await createInitiativePDF(formData)

      if (result.success) {
        toast({
          title: "Успешно запазен",
          description: "Документът беше успешно запазен",
        })

        // Refresh the list of PDFs
        const pdfsResult = await getInitiativePDFs()
        if (pdfsResult.success) {
          setHistory(pdfsResult.data)
        }

        // Reset form
        setFormData(emptyFormData)
        setIsFormComplete(false)
        setSelectedPdf(null)
      } else {
        toast({
          title: "Грешка при запазване",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving PDF:", error)
      toast({
        title: "Грешка при запазване",
        description: "Възникна проблем при запазване на документа",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeletePdf = async (id: string): Promise<void> => {
    setIsDeleting((prev) => ({ ...prev, [id]: true }))

    try {
      const result = await deleteInitiativePDF(id)

      if (result.success) {
        toast({
          title: "Успешно изтрит",
          description: "Документът беше успешно изтрит",
        })

        // Update local state
        setHistory((prev) => prev.filter((item) => item.id !== id))

        if (selectedPdf && selectedPdf.id === id) {
          setSelectedPdf(null)
          setFormData(emptyFormData)
        }
      } else {
        toast({
          title: "Грешка при изтриване",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting PDF:", error)
      toast({
        title: "Грешка при изтриване",
        description: "Възникна проблем при изтриване на документа",
        variant: "destructive",
      })
    } finally {
      setIsDeleting((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handleLoadPdf = (pdf: InitiativePDF): void => {
    setFormData({
      title: pdf.title,
      description: pdf.description,
      organizer: pdf.organizer,
      location: pdf.location || "",
      contact: pdf.contact || "",
      additionalInfo: pdf.additionalInfo || "",
      date: pdf.date instanceof Date ? pdf.date : new Date(pdf.date),
    })
    setSelectedPdf(pdf)
  }

  const filteredHistory = history.filter(
    (pdf) =>
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.organizer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column - History */}
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>История на документите</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Търсене..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-250px)]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-sm text-muted-foreground">Зареждане на документи...</p>
                </div>
              ) : filteredHistory.length > 0 ? (
                <div className="space-y-4">
                  {filteredHistory.map((pdf) => (
                    <Card
                      key={pdf.id}
                      className={cn(
                        "cursor-pointer hover:bg-muted/50",
                        selectedPdf?.id === pdf.id ? "border-primary" : "",
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1" onClick={() => handleLoadPdf(pdf)}>
                            <h3 className="font-medium truncate">{pdf.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(pdf.createdAt), "dd.MM.yyyy HH:mm")}
                            </p>
                            <p className="text-sm truncate mt-1">{pdf.organizer}</p>
                          </div>
                          <div className="flex space-x-2">
                            <PDFDownloadLink
                              document={<InitiativePDFDocument data={pdf} />}
                              fileName={`${pdf.title.replace(/\s+/g, "-")}-initiative.pdf`}
                              className="text-primary hover:text-primary/80"
                            >
                              {({ loading }) => (
                                <Button variant="ghost" size="icon" disabled={loading}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                            </PDFDownloadLink>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isDeleting[pdf.id]}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeletePdf(pdf.id)
                              }}
                            >
                              {isDeleting[pdf.id] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-destructive" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-medium">Няма намерени документи</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm ? "Опитайте с друго търсене" : "Създайте първия си документ"}
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Form */}
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{selectedPdf ? "Редактиране на инициатива" : "Въведете информация за инициативата"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заглавие на инициативата *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Въведете заглавие"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Дата на провеждане</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP", { locale: bg }) : "Изберете дата"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date instanceof Date ? formData.date : new Date(formData.date)}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание на инициативата *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Въведете описание"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizer">Организатор *</Label>
              <Input
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                placeholder="Въведете име на организатора"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Локация</Label>
              <Input
                id="location"
                name="location"
                value={formData.location || ""}
                onChange={handleInputChange}
                placeholder="Въведете локация"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Контактна информация</Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact || ""}
                onChange={handleInputChange}
                placeholder="Въведете контактна информация"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Допълнителна информация</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo || ""}
                onChange={handleInputChange}
                placeholder="Въведете допълнителна информация"
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">* Задължителни полета</p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(emptyFormData)
                  setSelectedPdf(null)
                }}
              >
                {selectedPdf ? "Нов документ" : "Изчисти"}
              </Button>

              <Button onClick={handleSavePdf} disabled={isSaving || !isFormComplete}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Запазване...
                  </>
                ) : selectedPdf ? (
                  "Запази като нов"
                ) : (
                  "Запази"
                )}
              </Button>

              <StablePDFDownload 
                formData={formData} 
                selectedPdf={selectedPdf} 
                isFormComplete={isFormComplete} 
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

