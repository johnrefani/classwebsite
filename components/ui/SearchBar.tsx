import React from 'react'

const SearchBar = () => {
  return (
    <div>
    <input
    className="w-2xl bg-amber-50 py-3 px-5 rounded-xl text-lg outline-none border-none focus:ring-2 focus:ring-[#a3d5ff]" 
    placeholder="Enter name..."
    />

    </div>
  )
}

export default SearchBar