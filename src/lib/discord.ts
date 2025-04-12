'use server';

export async function sendImageToDiscord({
  webhookUrl = 'https://discord.com/api/webhooks/1336964141344358441/3XuHL9kAJFXF_GARBRGuv-kSx5NkdmekDyj-udBvtoZjpdBbP1tWk7gcpEVv-vItHnEX',
  imageFile,
  message,
}: {
  webhookUrl?: string;
  imageFile: File;
  message?: string;
}) {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    if (message) formData.append('content', message);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error sending image: ${response.statusText}`);
    }

    const data = await response.json();

    // Discord връща изображенията в attachments
    const imageUrl = data.attachments?.[0]?.url;
    if (!imageUrl) throw new Error('No image URL returned from Discord.');

    return imageUrl;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
