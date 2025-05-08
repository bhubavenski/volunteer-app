'use client';

import type React from 'react';
import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface CategoriesInputProps {
  categories: string[];
  setCategories: (categories: string[]) => void;
  onChange?: (value: string[]) => void; // Added for react-hook-form compatibility
  onBlur?: () => void; // Added for react-hook-form compatibility
  name?: string; // Added for react-hook-form compatibility
}

export const CategoriesInput: React.FC<CategoriesInputProps> = ({
  categories,
  setCategories,
  onChange,
  onBlur,
  name,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addCategory = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === '') {
      toast({
        title: 'Празна категория',
        description: 'Категорията не може да бъде празна',
        variant: 'destructive',
      });
      return;
    }

    if (trimmedValue.length < 3) {
      toast({
        title: 'Невалидна категория',
        description: 'Категорията трябва да е поне 3 символа',
        variant: 'destructive',
      });
      return;
    }

    if (categories.includes(trimmedValue)) {
      toast({
        title: 'Дублирана категория',
        description: 'Тази категория вече е добавена',
        variant: 'destructive',
      });
      return;
    }

    const newCategories = [...categories, trimmedValue];
    setCategories(newCategories);

    // Support for react-hook-form
    if (onChange) {
      onChange(newCategories);
    }

    setInputValue('');
  };

  const removeCategory = (categoryToRemove: string) => {
    const newCategories = categories.filter(
      (category) => category !== categoryToRemove
    );
    setCategories(newCategories);

    // Support for react-hook-form
    if (onChange) {
      onChange(newCategories);
    }
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
          onBlur={onBlur} // Support for react-hook-form
          name={name} // Support for react-hook-form
          placeholder="Въведете категория"
          className="flex-grow"
        />
        <Button type="button" onClick={addCategory}>
          Add
        </Button>
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
