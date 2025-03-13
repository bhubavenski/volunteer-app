'use client';

import { HelpCircle, Trash2, LogOut } from 'lucide-react';
import React from 'react';
import { signOut } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/actions/users/auth.actions';
import { Toast, useToastContext } from '@/contexts/ToastContext';
import { Role } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProfileAdditionalOptionsProps = {
  onDelete?: (toast: Toast) => Promise<Toast>;
  role: Role;
};

export default function Settings({
  onDelete,
  role,
}: ProfileAdditionalOptionsProps) {
  const toast = useToastContext();

  const defaultHandleDelete = async () => {
    const result = await deleteUser();
    if (result?.error) {
      return toast({
        variant: 'destructive',
        title: 'Cannot delete profile',
        description: result.error,
      });
    }
    await signOut();
  };

  const handleDelete = onDelete || defaultHandleDelete;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className='flex flex-col gap-3'>
          <div>
            <Label>First name</Label>
            <Input />
          </div>
          <div>
            <Label>Last name</Label>
            <Input />
          </div>
          <Button>Update</Button>
        </form>
        <div>
          role: <span className="bold">{role}</span>
        </div>
        <Button variant="outline" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          <div className=" flex gap-2">
            <span>Help Center</span>
            <span className="text-muted-foreground font-light">
              Not implemented feature
            </span>
          </div>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start hover:bg-destructive/15 hover:text-destructive"
          onClick={() => handleDelete(toast)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
}
