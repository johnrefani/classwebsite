import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ClassInfo } from '@/types';

export async function POST(request: Request) {
  try {
    const { section, name } = await request.json();
    
    if (!section || !name) {
      return NextResponse.json(
        { success: false, error: 'Section and name are required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection<ClassInfo>('classinfo');

    // Find the class document for the section
    const classDoc = await collection.findOne({ section });
    
    // Generate new student ID
    const maxStudentIdResult = await collection
      .aggregate([
        { $unwind: '$students' },
        { $group: { _id: null, maxId: { $max: '$students.id' } } }
      ])
      .toArray();
    
    const newStudentId = maxStudentIdResult.length > 0 ? maxStudentIdResult[0].maxId + 1 : 1;

    // Generate new class _id if creating new document
    const maxClassIdResult = await collection
      .aggregate([{ $group: { _id: null, maxId: { $max: '$_id' } } }])
      .toArray();
    
    const newClassId = maxClassIdResult.length > 0 ? maxClassIdResult[0].maxId + 1 : 1;

    const newStudent = { id: newStudentId, name, 'time-in': '' };
    
    if (classDoc) {
      // Update existing class document
      await collection.updateOne(
        { section },
        { $push: { students: newStudent } }
      );
    } else {
      // Create new class document
      await collection.insertOne({
        _id: newClassId,
        section,
        students: [newStudent]
      });
    }

    return NextResponse.json({
      success: true,
      data: newStudent
    });
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add student' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { section, id, name } = await request.json();
    
    if (!section || id === undefined || !name) {
      return NextResponse.json(
        { success: false, error: 'Section, id, and name are required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection<ClassInfo>('classinfo');

    const result = await collection.updateOne(
      { section, 'students.id': id },
      { $set: { 'students.$.name': name } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id, name, 'time-in': '' }
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update student' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { section, id } = await request.json();
    
    if (!section || id === undefined) {
      return NextResponse.json(
        { success: false, error: 'Section and id are required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection<ClassInfo>('classinfo');

    const result = await collection.updateOne(
      { section },
      { $pull: { students: { id } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id }
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}