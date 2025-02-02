import { Metadata } from 'next';
import { CreateInitiativeForm } from './components/CreateInitiativeForm';

export const metadata: Metadata = {
  title: 'Създаване на инициатива | ДоброволциБГ',
  description: 'Създайте нова доброволческа инициатива',
};

export default function CreateInitiativePage() {
  return (
    <div className="container py-8  mx-auto max-w-[1000px]">
      <h1 className="text-3xl font-bold mb-8">Create initiative</h1>
      <CreateInitiativeForm />
    </div>
  );
}
