export async function uploadImageToImgur(imageFile: File | Blob): Promise<string | null> {
    const clientId = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID; // в .env файла сложи твоето Client ID
  
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.success) {
        return data.data.link; // линк към качената снимка
      } else {
        console.error('Imgur upload failed:', data);
        return null;
      }
    } catch (err) {
      console.error('Error uploading to Imgur:', err);
      return null;
    }
  }
  