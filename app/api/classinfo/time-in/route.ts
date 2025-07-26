import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ClassInfo } from '@/types';

export async function POST(request: Request) {
  try {
    const { _id, id, timeIn } = await request.json();

    if (_id === undefined || id === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: _id and id are required' },
        { status: 400 }
      );
    }

    if (typeof _id !== 'number' || typeof id !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid field types: _id and id must be numbers' },
        { status: 400 }
      );
    }

    if (timeIn !== undefined && typeof timeIn !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid field type: timeIn must be a string' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection<ClassInfo>('classinfo');

    const result = await collection.updateOne(
      { _id, 'students.id': id },
      { $set: { 'students.$.time-in': timeIn ?? '' } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'No matching document or student found' },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'No changes made to the document' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Time-in updated successfully',
    });
  } catch (error) {
    console.error('Error updating time-in:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update time-in' },
      { status: 500 }
    );
  }
}