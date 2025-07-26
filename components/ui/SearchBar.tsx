'use client';

import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import debounce from 'lodash.debounce';

interface StudentResult {
  section: string;
  student: {
    id: number;
    name: string;
    timeIn: string;
  };
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = debounce(async (searchText: string) => {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchText)}`);
      const data = await res.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    }

    setLoading(false);
  }, 300);

  useEffect(() => {
    handleSearch(query);
    return () => {
      handleSearch.cancel(); // cleanup
    };
  }, [query]);

  return (
    <div className="w-full max-w-xl">
      <div className="bg-white border border-gray-300 rounded-xl flex items-center px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 transition-all">
        <input
          type="text"
          placeholder="Search your name..."
          aria-label="Search"
          className="flex-grow bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IoSearch className="text-gray-500 text-xl" />
      </div>

      {loading && (
        <div className="mt-2 text-sm text-gray-500">Searching...</div>
      )}

      {results.length > 0 && (
        <ul className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 max-h-80 overflow-auto">
          {results.map((result, idx) => (
            <li
              key={`${result.student.id}-${idx}`}
              className="px-4 py-2 border-b last:border-b-0 hover:bg-gray-100 transition-all"
            >
              <div className="font-medium text-gray-900">{result.student.name}</div>
              <div className="text-sm text-gray-500">Section: {result.section}</div>
              <div className="text-sm text-gray-400">Time-in: {result.student.timeIn || 'N/A'}</div>
            </li>
          ))}
        </ul>
      )}

      {!loading && query && results.length === 0 && (
        <div className="mt-4 text-sm text-gray-400">No results found.</div>
      )}
    </div>
  );
};

export default SearchBar;
