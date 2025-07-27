"use client";
import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import StudentList from './Student';
import Dropdown from './Dropdown';

interface StudentClass {
  text: string;
}

interface Student {
  id: number;
  name: string;
  'time-in': string;
}

const StudentCard = ({ text }: StudentClass) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Fetch students when section changes
  useEffect(() => {
    if (selectedSection) {
      const fetchStudents = async () => {
        try {
          const response = await fetch(`/api/classinfo/filter?section=${encodeURIComponent(selectedSection)}`);
          const data = await response.json();
          if (data.success) {
            // Flatten students from all matching documents
            const allStudents = data.data.flatMap((item: any) => item.students);
            setStudents(allStudents);
            setFilteredStudents(allStudents);
          } else {
            console.error(data.error);
            setStudents([]);
            setFilteredStudents([]);
          }
        } catch (error) {
          console.error('Error fetching students:', error);
          setStudents([]);
          setFilteredStudents([]);
        }
      };
      fetchStudents();
    }
  }, [selectedSection]);

  // Filter students based on search query
  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  return (
    <div className="rounded-lg p-6 w-[500px] h-[600px] shadow-lg bg-white flex flex-col gap-4">
      <div className="w-full max-w-2xl flex justify-between">
        <h2 className="text-2xl font-bold text-black-pearl-950 mb-4">
          Class of: {selectedSection || text}
        </h2>
        <Dropdown baseSection={text} onSelect={setSelectedSection} />
      </div>
      <div className="w-full border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition">
        <IoSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-base text-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <hr className="w-full border-gray-300 border my-2" />
      <div className="flex-1 overflow-y-auto">
        <StudentList students={filteredStudents} />
      </div>
    </div>
  );
};

export default StudentCard;