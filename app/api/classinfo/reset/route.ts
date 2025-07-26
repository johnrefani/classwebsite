import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ClassInfo } from '@/types';

export async function POST() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<ClassInfo>('classinfo');

    const result = await collection.updateMany(
      {},
      { $set: { 'students.$[].time-in': '' } }
    );

    return NextResponse.json({
      success: true,
      message: `Reset time-in for ${result.modifiedCount} students`,
    });
  } catch (error) {
    console.error('Error resetting time-in:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset time-in' },
      { status: 500 }
    );
  }
}
