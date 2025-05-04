'use server'

import { UploadedImage } from "@/app/(main)/initiatives/create/components/UploadImage"

export async function uploadImagesToImgur(images: UploadedImage[], clientId: string): Promise<string[]> {
  const uploadedLinks: string[] = []

  for (const image of images) {
    const base64Data = image.url.split(',')[1] // премахваме data:image/...;base64,

    const formData = new FormData()
    formData.append('image', base64Data)
    formData.append('type', 'base64')

    const res = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    })

    if (!res.ok) {
      throw new Error(`Upload failed for image ${image.id}`)
    }

    const data = await res.json()
    uploadedLinks.push(data.data.link)
  }

  return uploadedLinks
}
