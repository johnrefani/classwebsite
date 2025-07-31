"use client";
import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import StudentList from './Student';
import Dropdown from './Dropdown';
import { motion, AnimatePresence } from 'framer-motion';
import { ClassInfo } from '@/types';

interface StudentClass {
  text: string;
}

const StudentCard = ({ text }: StudentClass) => {
  const [students, setStudents] = useState<ClassInfo['students']>([]);
  const [filteredStudents, setFilteredStudents] = useState<ClassInfo['students']>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [editStudentName, setEditStudentName] = useState('');

  // Fetch students when section changes
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

  const handleAddStudent = async () => {
    if (!selectedSection || !newStudentName) return;

    try {
      const response = await fetch('/api/classinfo/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: selectedSection, name: newStudentName }),
      });
      const data = await response.json();
      
      if (data.success) {
        setStudents([...students, data.data]);
        setFilteredStudents([...filteredStudents, data.data]);
        setNewStudentName('');
        setIsAddModalOpen(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEditStudent = async () => {
    if (!selectedSection || !selectedStudentId || !editStudentName) return;

    try {
      const response = await fetch('/api/classinfo/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: selectedSection, id: selectedStudentId, name: editStudentName }),
      });
      const data = await response.json();
      
      if (data.success) {
        setStudents(students.map(student => 
          student.id === selectedStudentId ? { ...student, name: editStudentName } : student
        ));
        setFilteredStudents(filteredStudents.map(student => 
          student.id === selectedStudentId ? { ...student, name: editStudentName } : student
        ));
        setEditStudentName('');
        setIsEditModalOpen(false);
        setSelectedStudentId(null);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async () => {
    if (!selectedSection || !selectedStudentId) return;

    try {
      const response = await fetch('/api/classinfo/students', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: selectedSection, id: selectedStudentId }),
      });
      const data = await response.json();
      
      if (data.success) {
        setStudents(students.filter(student => student.id !== selectedStudentId));
        setFilteredStudents(filteredStudents.filter(student => student.id !== selectedStudentId));
        setSelectedStudentId(null);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const openEditModal = () => {
    const selectedStudent = students.find(student => student.id === selectedStudentId);
    if (selectedStudent) {
      setEditStudentName(selectedStudent.name);
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="rounded-lg p-6 w-full md:w-[550px] h-screen md:h-[750px] shadow-lg bg-white flex flex-col gap-4">
      <div className="w-full max-w-2xl flex justify-between">
        <h2 className="text-2xl font-bold text-black-pearl-950 mb-4">
         {selectedSection || text}
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
        <StudentList students={filteredStudents} onSelect={setSelectedStudentId} selectedId={selectedStudentId} />
      </div>

      {/* Add Student Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-25 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl w-[400px]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black-pearl-950">Add Student</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="Enter student name"
                className="w-full text-black-pearl-950 border border-gray-400 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddStudent}
                  disabled={!newStudentName}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Student Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl w-[400px]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg text-black-pearl-950 font-semibold">Edit Student</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                value={editStudentName}
                onChange={(e) => setEditStudentName(e.target.value)}
                placeholder="Enter student name"
                className="w-full text-black-pearl-950 border border-gray-400 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleEditStudent}
                  disabled={!editStudentName}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-black-pearl-600 text-white rounded-lg hover:bg-black-pearl-700"
        >
          ADD STUDENT
        </button>
        <button
          onClick={handleDeleteStudent}
          disabled={!selectedStudentId}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          DELETE STUDENT
        </button>
        <button
          onClick={openEditModal}
          disabled={!selectedStudentId}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          EDIT STUDENT
        </button>
      </div>
    </div>
  );
};

export default StudentCard;