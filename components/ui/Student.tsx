"use client";
import React, { useState } from "react";

interface Student {
  id: number;
  name: string;
  'time-in'?: string;
}

interface Props {
  students: Student[];
}

const StudentList = ({ students }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {students.map((student) => (
        <div
          key={student.id}
          onClick={() =>
            setSelectedId(selectedId === student.id ? null : student.id)
          }
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