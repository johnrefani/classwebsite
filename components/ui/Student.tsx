import React from 'react';

interface Student{
  name?: string,
  accessDate?: string
}
const Student = ({name, accessDate}: Student) => {
  return (
    <div 
      className="flex justify-between items-center p-4 border border-black hover:bg-gray-50 cursor-pointer w-full"
    >
      <span className='text-gray-950'>{name}</span>
      <span className='text-gray-950'>{accessDate}</span>
    </div>
  );
}

export default Student;