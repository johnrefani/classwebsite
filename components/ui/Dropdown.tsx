import React from 'react'

const Dropdown = () => {
  return (
    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-black bg-gray-200 font-medium rounded-lg text-sm px-5 h-[30px] text-center inline-flex items-center " type="button">Dropdown 
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
    </button>
  )
}

export default Dropdown