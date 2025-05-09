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
import HTTPErrorMessage from './components/HTTPErrorMessage';

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
        <TabsList className="mb-10 max-sm:flex-col max-sm:h-auto max-sm:w-full">
          <TabsTrigger value="initiativeTab" className="w-full">
            Your initiatives
          </TabsTrigger>
          {session.user.role === Role.ADMIN && (
            <>
              <TabsTrigger value="administrateUsersTab" className="w-full">
                Administrate users
              </TabsTrigger>
              <TabsTrigger
                value="administrateInitiativesTab"
                className="w-full"
              >
                Administrate initiatives
              </TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value="initiativeTab">
          <Button>
            <Plus /> Add initiative
          </Button>
          <div className="grid grid-cols-4 gap-4 mt-6 max-sm:grid-cols-1">
            {initiatives.length ? (
              initiatives.map((initiative) => (
                <Link
                  href={`${AppLinks.DASHBOARD}/${initiative.id}`}
                  key={initiative.id}
                >
                  <PersonalInitiativesView initiative={initiative} />
                </Link>
              ))
            ) : (
              <div className="col-span-4 max-sm:col-span-1 flex justify-center items-center">
                <HTTPErrorMessage
                  href={AppLinks.CREATE_INITIATIVE}
                  code="404"
                  title="No Initiatives were found."
                  description="Sorry, we can't find that page."
                >
                  <Button>Create one!</Button>
                </HTTPErrorMessage>
              </div>
            )}
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
