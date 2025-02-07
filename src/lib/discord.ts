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

    // Връщаме само нужната информация
    console.log({
      status: response.status,
      statusText: response.statusText,
      message: 'Image sent successfully!',
    });
    return {
      status: response.status,
      statusText: response.statusText,
      message: 'Image sent successfully!',
    };
  } catch (error) {
    console.error('Error:', error);
    throw error; // Връщаме грешката за обработка в компонента
  }
}
