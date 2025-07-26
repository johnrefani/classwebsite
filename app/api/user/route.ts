
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { User } from '@/types';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<User>('user');
    const users = await collection.find({}).toArray();

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}