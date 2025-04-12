"use server"

import { revalidatePath } from "next/cache"
import type { InitiativePDF, Prisma } from "@prisma/client"
import { db } from "@/prisma/db"

// Типове за отговорите от сървърните действия
type SuccessResponse<T> = {
  success: true
  data: T
}

type ErrorResponse = {
  success: false
  error: string
}

type ActionResponse<T> = SuccessResponse<T> | ErrorResponse

// Fetch all PDF documents
export async function getInitiativePDFs(): Promise<ActionResponse<InitiativePDF[]>> {
  try {
    const pdfs = await db.initiativePDF.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return { success: true, data: pdfs }
  } catch (error) {
    console.error("Error fetching PDFs:", error)
    return { success: false, error: "Failed to fetch PDFs" }
  }
}

// Create a new PDF document
export async function createInitiativePDF(
  data: Prisma.InitiativePDFCreateInput,
): Promise<ActionResponse<InitiativePDF>> {
  try {
    const pdf = await db.initiativePDF.create({
      data: {
        title: data.title,
        description: data.description,
        organizer: data.organizer,
        location: data.location || "",
        contact: data.contact || "",
        additionalInfo: data.additionalInfo || "",
        date: new Date(data.date),
      },
    })

    revalidatePath("/")
    return { success: true, data: pdf }
  } catch (error) {
    console.error("Error creating PDF:", error)
    return { success: false, error: "Failed to create PDF" }
  }
}

// Delete a PDF document
export async function deleteInitiativePDF(id: string): Promise<ActionResponse<void>> {
  try {
    await db.initiativePDF.delete({
      where: { id },
    })

    revalidatePath("/")
    return { success: true, data: undefined }
  } catch (error) {
    console.error("Error deleting PDF:", error)
    return { success: false, error: "Failed to delete PDF" }
  }
}

// Get a single PDF document by ID
export async function getInitiativePDFById(id: string): Promise<ActionResponse<InitiativePDF>> {
  try {
    const pdf = await db.initiativePDF.findUnique({
      where: { id },
    })

    if (!pdf) {
      return { success: false, error: "PDF not found" }
    }

    return { success: true, data: pdf }
  } catch (error) {
    console.error("Error fetching PDF:", error)
    return { success: false, error: "Failed to fetch PDF" }
  }
}
