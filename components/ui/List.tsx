'use client';

import React, { useState } from 'react';
import { ClassInfo } from '@/types';

interface Props {
  students: ClassInfo['students'];
  classId: number;
  onSelect: (id: number | null) => void;
  selectedId: number | null;
}

interface StudentData {
  id: number;
  name: string;
}

const StudentList = ({ students, classId, onSelect, selectedId }: Props) => {
  const [selectedStudentData, setSelectedStudentData] = useState<StudentData | null>(null);

  const handleTimeIn = async () => {
    if (!selectedStudentData) return;

    const { id, name } = selectedStudentData;

    const currentTime = new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    try {
      const res = await fetch('/api/classinfo/time-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: classId, id, timeIn: currentTime }),
      });

      const data = await res.json();

      if (data.success) {
        onSelect(id); 
        setSelectedStudentData(null); 
        window.location.reload();
      } else {
        alert(data.error || 'Failed to time in.');
      }
    } catch (error) {
      console.error('Time-in error:', error);
      alert('An error occurred while updating time-in.');
    }
  };

  return (
    <div className="space-y-2">
      {students.map((student) => (
        <div
          key={student.id}
          onClick={() => {
            if (!student['time-in']) {
              setSelectedStudentData({ id: student.id, name: student.name });
              onSelect(student.id);
            }
          }}
          className={`flex items-center justify-between px-4 py-3 border rounded-lg transition 
            ${
              student['time-in']
                ? 'border-black-pearl-200 bg-gray-100 cursor-not-allowed'
                : selectedId === student.id
                ? 'bg-blue-50 border-blue-400 cursor-pointer'
                : 'border-black-pearl-200 hover:bg-black-pearl-50 cursor-pointer'
            }`}
        >
          <div className="text-black-pearl-950 font-medium text-sm md:text-base">
            {student.name}
          </div>
          {student['time-in'] && (
            <div className="text-black-pearl-900 text-xs md:text-sm">
              {student['time-in']}
            </div>
          )}
        </div>
      ))}

      {selectedStudentData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-base md:text-lg lg:text-xl text-black-pearl-950 font-semibold mb-4">
              Confirm Time-In
            </h2>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-6">
              Are you sure you want to time-in for <span className='text-black-pearl-600'>{selectedStudentData.name}</span>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedStudentData(null);
                  onSelect(null);
                }}
                className="px-4 py-2 text-sm md:text-base text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleTimeIn}
                className="px-4 py-2 text-sm md:text-base bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;