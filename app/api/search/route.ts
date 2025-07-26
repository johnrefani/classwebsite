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

    // Search for students whose names match the query (case-insensitive)
    const results = await collection
      .aggregate([
        // Unwind the students array to process each student individually
        { $unwind: '$students' },
        // Match student names against the query
        {
          $match: {
            'students.name': { $regex: query, $options: 'i' },
          },
        },
        // Project the relevant fields
        {
          $project: {
            section: 1,
            student: '$students',
            _id: 0,
          },
        },
      ])
      .toArray();

    // Transform results to a cleaner format
    const formattedResults = results.map((result) => ({
      section: result.section,
      student: {
        id: result.student.id,
        name: result.student.name,
        timeIn: result.student['time-in'],
      },
    }));

    return NextResponse.json({
      success: true,
      data: formattedResults,
    });
  } catch (error) {
    console.error('Error searching student names:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search student names' },
      { status: 500 }
    );
  }
}