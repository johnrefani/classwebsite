import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { Admin } from '@/components/Admin';

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  return (
    <div>
      <Admin />
    </div>
  );
}