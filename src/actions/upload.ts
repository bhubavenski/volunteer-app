'use server'
// /app/upload-image/route.ts

export async function uploadImageToImgur(imageBase64: string) {
  const clientId = process.env.IMGUR_CLIENT_ID;

  if (!clientId) {
    throw new Error('Imgur Client ID not set');
  }

  const response = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${clientId}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageBase64 }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.data?.error || 'Failed to upload image');
  }

  return data.data.link;
}
