"use client";
import React from "react";
import { ClassInfo } from '@/types';

interface Props {
  students: ClassInfo['students'];
  onSelect: (id: number | null) => void;
  selectedId: number | null;
}

const StudentList = ({ students, onSelect, selectedId }: Props) => {
  return (
    <div className="space-y-2">
      {students.map((student) => (
        <div
          key={student.id}
          onClick={() => onSelect(selectedId === student.id ? null : student.id)}
          className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition 
            ${
              selectedId === student.id
                ? "bg-blue-50 border-blue-400"
                : "border-black-pearl-200 hover:bg-black-pearl-50"
            }`}
        >
          <div className="text-black-pearl-950 font-medium text-sm">
            {student.name}
          </div>
          {selectedId === student.id && student['time-in'] && (
            <div className="text-black-pearl-900 text-xs">
              {student['time-in']}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentList;