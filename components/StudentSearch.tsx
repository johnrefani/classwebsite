import React from 'react';
import SearchBar from './ui/SearchBar';

const StudentSearch = () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-6 px-4">
      <h1 className="text-white text-base md:text-2xl lg:text-4xl font-bold tracking-wide text-center drop-shadow-md">
        Search Student Name
      </h1>
      <SearchBar />
    </div>
  );
};

export default StudentSearch;
