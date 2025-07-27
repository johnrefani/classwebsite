import React from 'react'
import { IoSearch } from "react-icons/io5";
import Student from './Student';
import Dropdown from './Dropdown';


interface StudentClass{
  text: string,
}
const StudentCard = ({text}: StudentClass) => {

const students = [
  { id: 1, name: "JOHN DOE", accessDate: "2025-07-25 13:00" },
  { id: 2, name: "JANE SMITH", accessDate: "2025-07-25 14:15" },
  { id: 3, name: "ALAN WRIGHT", accessDate: "2025-07-25 15:45" },
];

  return (
    <div className=' rounded-lg p-6 w-[500px] h-[600px] shadow-lg bg-white gap-4'>
      <div className='w-full max-w-2xl flex justify-between'>
          <h2 className='text-2xl font-bold text-black-pearl-950 mb-4'>{text}</h2>           
          <Dropdown/>
      </div>
      <div className="w-full border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition">
        <IoSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search name"
          className="w-full bg-transparent text-base text-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>
        <hr className='w-full border-gray-300 border my-2'></hr>
        <Student students={students}/>
    </div>
  )
}

export default StudentCard