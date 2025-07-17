import React from 'react'
import Button from './ui/Button'

const Card = () => {
  return (
    <div className='bg-white rounded-lg p-6 w-[500px] h-[260px]'>
      <div className='border-b-1 border-black w-full max-w-2xl'>
        <h2 className='text-2xl font-semibold text-gray-950 mb-4'>Course and Section</h2>
      </div>
       <div className='grid grid-cols-2 gap-6 p-2'>
        <div>
          <h2 className="text-xl font-medium text-gray-950">Course</h2>
          <select className="mt-2 w-full p-2 border text-gray-950 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option className='text-gray-950'>Select course</option>
          
          </select>
        </div>

        <div>
          <h2 className="text-xl font-medium text-gray-950">Section</h2>
          <select className="mt-2 w-full p-2 border text-gray-950 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option className='text-gray-950'>Select section</option>
          
          </select>
        </div>
      </div>
      <div className='text-right'>
        <Button/> 
      </div>
      
    </div>
  )
}

export default Card