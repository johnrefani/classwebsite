import React from 'react'
import Student from './ui/Student'
import Button from './ui/Button'

const StudentList = () => {
  return (
    <div className='bg-white rounded-lg p-6 w-[500px] h-[600px]'>
        <div className='w-full max-w-2xl'>
            <h2 className='text-2xl font-semibold text-gray-950 mb-4'>Course</h2>
        </div>
        <div className="pb-4 border-gray-950 border-b-1 ">
            <input type="text" placeholder="Search name" className="w-full px-4 py-2 border text-gray-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
                <Student/>
            </div>
            
        </div>

        <div className='text-right'>
            <Button/> 
        </div>
    
    </div>
  )
}

export default StudentList