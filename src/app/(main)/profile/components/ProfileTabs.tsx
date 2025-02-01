import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import React from 'react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SecurityForm from './forms/SecurityForm';

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="personal" className="space-y-4">
      <TabsList className="text-sm sm:text-base w-full sm:w-auto">
        <TabsTrigger value="personal">Personal Information</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalInfoForm />
      </TabsContent>

      <TabsContent value="security">
        <SecurityForm />
      </TabsContent>
    </Tabs>
  );
}
