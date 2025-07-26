
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ClassInfo } from '@/types';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<ClassInfo>('classinfo');
    const classInfo = await collection.find({}).toArray();

    return NextResponse.json({
      success: true,
      data: classInfo,
    });
  } catch (error) {
    console.error('Error fetching classinfo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch classinfo' },
      { status: 500 }
    );
  }
}