import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="w-2xl bg-amber-50 py-3 px-5 rounded-xl text-lg text-black outline-none border-none focus:ring-2 focus:ring-[#a3d5ff] flex items-center justify-between" >
    <input
    className='w-full border-none'
    placeholder="Enter name..."
    />
    <IoSearch />

    </div>
  )
}

export default SearchBar