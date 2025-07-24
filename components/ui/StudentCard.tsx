import React from 'react'
import { IoSearch } from "react-icons/io5";
import Student from './Student';

interface StudentClass{
  text: string,
}
const StudentCard = ({text}: StudentClass) => {
  return (
    <div className='bg-white rounded-lg p-6 w-[500px] h-[600px]'>
        <div className='w-full max-w-2xl'>
            <h2 className='text-2xl font-semibold text-gray-950 mb-4'>{text}</h2>
        </div>
        <div className='w-full border-black border py-3 mb-2 px-5 rounded-xl text-lg text-black outline-none flex items-center justify-start gap-1'>
            <IoSearch />
            <input
            className='w-full'
            placeholder="Search name"
            />
        
        </div>
        <hr className='w-full border-black border my-2'></hr>
        <Student name='Johnrey Luntayao' accessDate='2025'/>
    </div>
  )
}

export default StudentCard