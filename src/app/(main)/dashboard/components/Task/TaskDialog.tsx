'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Tiptap from '@/components/TipTap';

export default function TaskDialog({
  isDialogOpen,
  setIsDialogOpen,
  content,
  description,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  description: string;
}) {
  const [value, onChange] = useState(description);
  const [isInEditMode, setIsInEditMode] = useState({
    content: false,
    description: false,
  });

  function changeContentEditableMode(bol: boolean) {
    setIsInEditMode((prev) => ({ ...prev, content: bol }));
  }
  function changeDescriptionEditableMode(bol: boolean) {
    setIsInEditMode((prev) => ({ ...prev, description: bol }));
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogContent className="min-h-60 flex flex-col">
        <DialogHeader>
          <DialogTitle
            contentEditable={isInEditMode.content}
            onClick={() => changeContentEditableMode(true)}
          >
            {content}
          </DialogTitle>
          {isInEditMode.content && (
            <div className="flex gap-3 mt-auto">
              <Button>Save</Button>
              <Button
                variant="secondary"
                onClick={() => changeContentEditableMode(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </DialogHeader>

        {isInEditMode.description ? (
          <>
            <Tiptap value={value ?? ''} onChange={onChange} />
            <div className="flex gap-3 mt-auto">
              <Button>Save</Button>
              <Button
                variant="secondary"
                onClick={() => changeDescriptionEditableMode(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <p onClick={() => changeDescriptionEditableMode(true)}>
            {description}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
