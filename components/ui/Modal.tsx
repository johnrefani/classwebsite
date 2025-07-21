import React from 'react'
import Button from './Button'

const Modal = () => {
  return (
    <div className='w-[500px] h-[250px] bg-blue-950 rounded-lg gap-4 flex-col'>
      <h1 className='p-5 text-xl'>Do you want to time in?</h1>
      <div className='flex items-center justify-center'>
        <h2 className='text-2xl p-5'>Johnrey Luntayao</h2>
      </div>

      <div className="p-4 text-right">
        <Button/>
      </div>
      
    </div>
  )
}

export default Modal