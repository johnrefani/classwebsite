import React from 'react';

const Student = () => {
  return (
    <div 
      className="flex justify-between items-center rounded-md p-4 bg-blue-100  hover:bg-gray-50 cursor-pointer w-full"
    >
      <span className='text-gray-950'>Student Name</span>
      <span className='text-gray-950'>Access Date</span>
    </div>
  );
}

export default Student;