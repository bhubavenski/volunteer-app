'use client';
import { Dispatch, SetStateAction } from 'react';
import { ImageDropInput } from '@/components/ImageDropInput';
import { X } from 'lucide-react';
import Image from 'next/image';

interface UploadedImage {
  id: string;
  url: string;
  type: string;
}

export default function UploadImage({
  error,
  setError,
  uploadedImages,
  setUploadedImages,
}: {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  uploadedImages: UploadedImage[];
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>;
}) {
  
  const handleImageUpload = (file: File) => {
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError('Моля, качете само PNG или JPEG изображения.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        const newImage: UploadedImage = {
          id: Date.now().toString(),
          url: e.target.result,
          type: file.type,
        };
        setUploadedImages((prevImages) => [...prevImages, newImage]);
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload image</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ImageDropInput onImageUpload={handleImageUpload} multiple={true} />
      {uploadedImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Uploaded images:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="w-full h-48 relative">
                  <Image
                    src={image.url || '/placeholder.svg'}
                    alt="Качено изображение"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
