'use client';

import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import StudentList from './ui/List';
import Dropdown from './ui/Dropdown';
import { ClassInfo } from '@/types';

interface StudentClass {
  text: string;
}

const StudentCard = ({ text }: StudentClass) => {
  const [students, setStudents] = useState<ClassInfo['students']>([]);
  const [filteredStudents, setFilteredStudents] = useState<ClassInfo['students']>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [classId, setClassId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedSection) {
      const fetchStudents = async () => {
        try {
          const response = await fetch(`/api/classinfo/filter?section=${encodeURIComponent(selectedSection)}`);
          const data = await response.json();
          if (data.success) {
            const allStudents = data.data.flatMap((item: ClassInfo) => item.students);
            setStudents(allStudents);
            setFilteredStudents(allStudents);
            setClassId(data.data[0]?._id || null);
          } else {
            console.error(data.error);
            setStudents([]);
            setFilteredStudents([]);
            setClassId(null);
          }
        } catch (error) {
          console.error('Error fetching students:', error);
          setStudents([]);
          setFilteredStudents([]);
          setClassId(null);
        }
      };
      fetchStudents();
    }
  }, [selectedSection]);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  const handleSelect = (id: number | null) => {
    setSelectedId(id);
  };

  return (
    <div className="mt-4 rounded-lg p-6 w-full md:w-[550px] h-screen md:h-[750px] shadow-lg bg-white flex flex-col gap-4">
      <div className="w-full max-w-2xl flex justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black-pearl-950 mb-4">
          {selectedSection || text}
        </h2>
        <Dropdown baseSection={text} onSelect={setSelectedSection} />
      </div>
      <div className="w-full border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition">
        <IoSearch className="text-gray-500 text-base md:text-lg lg:text-xl" />
        <input
          type="text"
          placeholder="Search name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm md:text-base text-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <hr className="w-full border-gray-300 border my-2" />
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <StudentList
          students={filteredStudents}
          classId={classId ?? 0}
          onSelect={handleSelect}
          selectedId={selectedId}
        />
      </div>
    </div>
  );
};

export default StudentCard;