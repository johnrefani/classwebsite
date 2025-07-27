import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  return session ? JSON.parse(session) : null;
}

export async function createSession(user: { username: string }) {
  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}