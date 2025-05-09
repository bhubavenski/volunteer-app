'use client';

import type React from 'react';
import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';
import {
  CalendarIcon,
  Search,
  FileText,
  Download,
  Trash2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Font } from '@react-pdf/renderer';
import type { InitiativePDF, Prisma } from '@prisma/client';
import {
  createInitiativePDF,
  getInitiativePDFs,
  deleteInitiativePDF,
} from '@/actions/pdf.actions';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// В началото на файла
Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto-Regular.ttf', // път от `public`
});

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column' as const,
    backgroundColor: '#fff',
    padding: 30,
    fontFamily: 'Roboto',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
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
});

// PDF Document Component
interface InitiativePDFDocumentProps {
  data: InitiativePDF | Prisma.InitiativePDFCreateInput;
}

const InitiativePDFDocument: React.FC<InitiativePDFDocumentProps> = ({
  data,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>
          Дата: {format(new Date(data.date), 'dd.MM.yyyy')}
        </Text>

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
);

// Схема за валидация на формуляра
const formSchema = z.object({
  title: z.string().min(1, { message: 'Заглавието е задължително' }),
  date: z.date(),
  description: z.string().min(1, { message: 'Описанието е задължително' }),
  organizer: z.string().min(1, { message: 'Организаторът е задължителен' }),
  // location: z.string().optional(),
  // contact: z.string().optional(),
  // additionalInfo: z.string().optional(),
});

// Тип за формуляра
type FormValues = z.infer<typeof formSchema>;

// Мемоизиран компонент за PDF изтегляне, за да предотвратим ненужни ререндерирания
interface StablePDFDownloadProps {
  formData: FormValues;
  selectedPdf: InitiativePDF | null;
  isFormValid: boolean;
}

const StablePDFDownload = memo(
  ({ formData, selectedPdf, isFormValid }: StablePDFDownloadProps) => {
    // Type for the render prop function in PDFDownloadLink
    type RenderPDFLinkProps = {
      loading: boolean;
      error: Error | null;
    };

    const buttonClass = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2',
      isFormValid
        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
        : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
    );

    if (!isFormValid) {
      return (
        <button className={buttonClass} disabled>
          Изтегли PDF
        </button>
      );
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
        fileName={`${formData.title.replace(/\s+/g, '-')}-initiative.pdf`}
        className={buttonClass}
      >
        {({ loading, error }: RenderPDFLinkProps) => {
          if (error) {
            return 'Грешка';
          }
          return loading ? 'Подготовка...' : 'Изтегли PDF';
        }}
      </PDFDownloadLink>
    );
  }
);

StablePDFDownload.displayName = 'StablePDFDownload';

// Мемоизиран компонент за карта на документ
interface PDFCardProps {
  pdf: InitiativePDF;
  isSelected: boolean;
  isDeleting: boolean;
  onLoad: (pdf: InitiativePDF) => void;
  onDelete: (id: string) => void;
}

const PDFCard = memo(
  ({ pdf, isSelected, isDeleting, onLoad, onDelete }: PDFCardProps) => {
    // console.log(`Rendering card for ${pdf.title}`);

    return (
      <Card
        className={cn(
          'cursor-pointer hover:bg-muted/50',
          isSelected ? 'border-primary' : ''
        )}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1" onClick={() => onLoad(pdf)}>
              <h3 className="font-medium truncate">{pdf.title}</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(pdf.createdAt), 'dd.MM.yyyy HH:mm')}
              </p>
              <p className="text-sm truncate mt-1">{pdf.organizer}</p>
            </div>
            <div className="flex space-x-2">
              <PDFDownloadLink
                document={<InitiativePDFDocument data={pdf} />}
                fileName={`${pdf.title.replace(/\s+/g, '-')}-initiative.pdf`}
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
                disabled={isDeleting}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(pdf.id);
                }}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 text-destructive" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

PDFCard.displayName = 'PDFCard';

// Мемоизиран компонент за историята на документите
interface HistoryListProps {
  history: InitiativePDF[];
  searchTerm: string;
  isLoading: boolean;
  isDeleting: Record<string, boolean>;
  onLoadPdf: (pdf: InitiativePDF) => void;
  onDeletePdf: (id: string) => void;
  selectedPdfId: string | null;
}

const HistoryList = memo(
  ({
    history,
    searchTerm,
    isLoading,
    isDeleting,
    onLoadPdf,
    onDeletePdf,
    selectedPdfId,
  }: HistoryListProps) => {
    const filteredHistory = useMemo(
      () =>
        history.filter(
          (pdf) =>
            pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pdf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pdf.organizer.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      [history, searchTerm]
    );

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-sm text-muted-foreground">
            Зареждане на документи...
          </p>
        </div>
      );
    }

    if (filteredHistory.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-medium">Няма намерени документи</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {searchTerm
              ? 'Опитайте с друго търсене'
              : 'Създайте първия си документ'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {filteredHistory.map((pdf) => (
          <PDFCard
            key={pdf.id}
            pdf={pdf}
            isSelected={selectedPdfId === pdf.id}
            isDeleting={isDeleting[pdf.id] || false}
            onLoad={onLoadPdf}
            onDelete={onDeletePdf}
          />
        ))}
      </div>
    );
  }
);

HistoryList.displayName = 'HistoryList';

// Компонент за търсене
interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBox = memo(({ searchTerm, onSearchChange }: SearchBoxProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Търсене..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
});

SearchBox.displayName = 'SearchBox';

export function InitiativePdfGenerator(): React.ReactElement {
  const { toast } = useToast();
  const [history, setHistory] = useState<InitiativePDF[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPdf, setSelectedPdf] = useState<InitiativePDF | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});

  // Инициализиране на React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      organizer: '',
     date: new Date(),
    },
  });

  // Извличане на текущите стойности на формуляра
  const formValues = form.watch();
  const isFormValid = form.formState.isValid;

  // Load PDFs from database on component mount
  useEffect(() => {
    const fetchPDFs = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const result = await getInitiativePDFs();
        if (result.success) {
          setHistory(result.data);
        } else {
          toast({
            title: 'Грешка при зареждане',
            description: result.error,
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching PDFs:', error);
        toast({
          title: 'Грешка при зареждане',
          description: 'Възникна проблем при зареждане на документите',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPDFs();
  }, [toast]);

  const onSubmit = useCallback(
    async (data: FormValues): Promise<void> => {
      setIsSaving(true);
      try {
        const result = await createInitiativePDF(data);

        if (result.success) {
          toast({
            title: 'Успешно запазен',
            description: 'Документът беше успешно запазен',
          });

          // Refresh the list of PDFs
          const pdfsResult = await getInitiativePDFs();
          if (pdfsResult.success) {
            setHistory(pdfsResult.data);
          }

          // Reset form
          form.reset({
            title: '',
            description: '',
            organizer: '',
            date: new Date(),
          });
          setSelectedPdf(null);
        } else {
          toast({
            title: 'Грешка при запазване',
            description: result.error,
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error saving PDF:', error);
        toast({
          title: 'Грешка при запазване',
          description: 'Възникна проблем при запазване на документа',
          variant: 'destructive',
        });
      } finally {
        setIsSaving(false);
      }
    },
    [form, toast]
  );

  const handleDeletePdf = useCallback(
    async (id: string): Promise<void> => {
      setIsDeleting((prev) => ({ ...prev, [id]: true }));

      try {
        const result = await deleteInitiativePDF(id);

        if (result.success) {
          toast({
            title: 'Успешно изтрит',
            description: 'Документът беше успешно изтрит',
          });

          // Update local state
          setHistory((prev) => prev.filter((item) => item.id !== id));

          if (selectedPdf && selectedPdf.id === id) {
            setSelectedPdf(null);
            form.reset({
              title: '',
              description: '',
              organizer: '',
              date: new Date(),
            });
          }
        } else {
          toast({
            title: 'Грешка при изтриване',
            description: result.error,
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error deleting PDF:', error);
        toast({
          title: 'Грешка при изтриване',
          description: 'Възникна проблем при изтриване на документа',
          variant: 'destructive',
        });
      } finally {
        setIsDeleting((prev) => ({ ...prev, [id]: false }));
      }
    },
    [form, selectedPdf, toast]
  );

  const handleLoadPdf = useCallback(
    (pdf: InitiativePDF): void => {
      form.reset({
        title: pdf.title,
        description: pdf.description,
        organizer: pdf.organizer,
        date: pdf.date instanceof Date ? pdf.date : new Date(pdf.date),
      });
      setSelectedPdf(pdf);
    },
    [form]
  );

  const handleReset = useCallback((): void => {
    form.reset({
      title: '',
      description: '',
      organizer: '',
      date: new Date(),
    });
    setSelectedPdf(null);
  }, [form]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column - History */}
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>История на документите</CardTitle>
            <SearchBox
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-250px)]">
              <HistoryList
                history={history}
                searchTerm={searchTerm}
                isLoading={isLoading}
                isDeleting={isDeleting}
                onLoadPdf={handleLoadPdf}
                onDeletePdf={handleDeletePdf}
                selectedPdfId={selectedPdf?.id || null}
              />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Form */}
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedPdf
                ? 'Редактиране на инициатива'
                : 'Въведете информация за инициативата'}
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (err) =>
                console.log('error submitting', err)
              )}
            >
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Заглавие на инициативата *</FormLabel>
                      <FormControl>
                        <Input placeholder="Въведете заглавие" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Дата на провеждане</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, 'PPP', { locale: bg })
                                : 'Изберете дата'}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание на инициативата *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Въведете описание"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Организатор *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Въведете име на организатора"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Локация</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Въведете локация"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Контактна информация</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Въведете контактна информация"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Допълнителна информация</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Въведете допълнителна информация"
                          rows={3}
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </CardContent>
              <CardFooter className="flex justify-between max-sm:flex-col">
                <p className="text-sm text-muted-foreground">
                  * Задължителни полета
                </p>
                <div className="flex space-x-2">
                  <Button type="button" variant="outline" onClick={handleReset}>
                    {selectedPdf ? 'Нов документ' : 'Изчисти'}
                  </Button>

                  <Button type="submit" disabled={isSaving || !isFormValid}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Запазване...
                      </>
                    ) : selectedPdf ? (
                      'Запази като нов'
                    ) : (
                      'Запази'
                    )}
                  </Button>

                  <StablePDFDownload
                    formData={formValues}
                    selectedPdf={selectedPdf}
                    isFormValid={isFormValid}
                  />
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
