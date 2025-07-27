import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { User } from '@/types';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection<User>('user');

    const user = await collection.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    if (password !== user.password) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    await createSession({ username: user.username });

    return NextResponse.json({ success: true, data: { username: user.username } });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
}