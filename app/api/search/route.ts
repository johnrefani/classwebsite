import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ClassInfo } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection<ClassInfo>('classinfo');

    const results = await collection
      .aggregate([
        { $unwind: '$students' },
        {
          $match: {
            'students.name': { $regex: query, $options: 'i' },
          },
        },
        {
          $project: {
            _id: 1,
            section: 1,
            student: {
              id: '$students.id',
              name: '$students.name',
              timeIn: '$students.time-in',
            },
          },
        },
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
