'use client';

import type React from 'react';
import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CategoriesInputProps {
  categories: string[];
  setCategories: (categories: string[]) => void;
}

export const CategoriesInput: React.FC<CategoriesInputProps> = ({
  categories,
  setCategories,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addCategory = () => {
    if (inputValue.trim() !== '' && !categories.includes(inputValue.trim())) {
      const newCategories = [...categories, inputValue.trim()];
      setCategories(newCategories);
      setInputValue('');
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    const newCategories = categories.filter(
      (category) => category !== categoryToRemove
    );
    setCategories(newCategories);
    // onCategoriesChange(newCategories)
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCategory();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Въведете категория"
          className="flex-grow"
        />
        <Button onClick={addCategory}>Add</Button>
      </div>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
            >
              {category}
              <button
                type="button"
                onClick={() => removeCategory(category)}
                className="ml-2 focus:outline-none"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
