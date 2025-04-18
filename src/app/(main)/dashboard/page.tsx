import React from 'react';
import PersonalInitiativesView from './components/PersonalInitiativesView';
// import LayoutNav from './components/LayoutNav';
import { getInitiatives } from '@/actions/initiatives.actions';
import { AppLinks } from '@/constants/AppLinks';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Role } from '@prisma/client';
import { UsersTable } from './components/UsersTable';
import { InitiativesTable } from './components/InitiativesTable';

export default async function page() {
  const session = await auth();
  if (!session?.user.sub) {
    redirect(AppLinks.SIGN_IN);
  }

  const initiatives = await getInitiatives({
    where: {
      author: {
        id: session?.user.sub,
      },
    },
  });

  return (
    <>
      {/* <LayoutNav /> */}
      <Tabs defaultValue="initiativeTab">
        <TabsList>
          <TabsTrigger value="initiativeTab">Your initiatives</TabsTrigger>
          {session.user.role === Role.ADMIN && (
            <>
              <TabsTrigger value="administrateUsersTab">
                Administrate users
              </TabsTrigger>
              <TabsTrigger value="administrateInitiativesTab">
                Administrate initiatives
              </TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value="initiativeTab">
          <Button>
            <Plus /> Add initiative
          </Button>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {initiatives.map((initiative) => (
              <Link
                href={`${AppLinks.DASHBOARD}/${initiative.id}`}
                key={initiative.id}
              >
                <PersonalInitiativesView initiative={initiative} />
              </Link>
            ))}
          </div>
        </TabsContent>
        {session.user.role === Role.ADMIN && (
          <>
            <TabsContent value="administrateUsersTab">
              <UsersTable />
            </TabsContent>
            <TabsContent value="administrateInitiativesTab">
              <InitiativesTable />
            </TabsContent>
          </>
        )}
      </Tabs>
    </>
  );
}
