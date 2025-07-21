import React from 'react'
import SearchBar from './ui/SearchBar'

const StudentSearch = () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-3">
        
        <h1 className='text-blue-200 text-3xl'>
            SEARCH STUDENT NAME
        </h1> 
        
        <SearchBar/>

    </div>
  )
}

export default StudentSearch