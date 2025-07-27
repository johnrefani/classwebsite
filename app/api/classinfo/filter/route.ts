import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ClassInfo } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section')?.trim();
    const _id = searchParams.get('_id') ? Number(searchParams.get('_id')) : undefined;

    if (!section) {
      return NextResponse.json(
        { success: false, error: 'Section is required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection<ClassInfo>('classinfo');

    // Build query
    const query: any = { section: { $regex: `^${section}`, $options: 'i' } };
    if (_id !== undefined) {
      query._id = _id;
    }

    const results = await collection.find(query).toArray();

    if (results.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No matching classes found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Error fetching classinfo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch classinfo' },
      { status: 500 }
    );
  }
}