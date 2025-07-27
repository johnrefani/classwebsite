'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { IoSearch } from 'react-icons/io5';
import debounce from 'lodash.debounce';
import Modal from './Modal';

interface StudentResult {
  _id: string;
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
  const [selectedStudentData, setSelectedStudentData] = useState<{
    _id: string;
    id: number;
    name: string;
  } | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (searchText: string) => {
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
        console.error('Search failed:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  const handleTimeIn = async () => {
    if (!selectedStudentData) return;

    const { _id, id, name } = selectedStudentData;

    const currentTime = new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    console.log('Sending to API:', {
      _id,
      id,
      timeIn: currentTime,
    });

    try {
      const res = await fetch('/api/classinfo/time-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, id, timeIn: currentTime }),
      });

      const data = await res.json();

      if (data.success) {
        setResults((prev) =>
          prev.map((r) =>
            r._id === _id && r.student.id === id
              ? { ...r, student: { ...r.student, timeIn: currentTime } }
              : r
          )
        );
        setSelectedStudentData(null);
      } else {
        alert(data.error || 'Failed to time in.');
      }
    } catch (error) {
      console.error('Time-in error:', error);
      alert('An error occurred while updating time-in.');
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl">
      {/* Search Input */}
      <div className="bg-white border border-gray-300 rounded-xl flex items-center px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 transition-all">
        <input
          type="text"
          placeholder="Search your name..."
          aria-label="Search"
          className="flex-grow bg-transparent outline-none text-gray-800 placeholder-gray-500 text-xs md:text-sm lg:text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IoSearch className="text-gray-500 text-xl" />
      </div>

      {loading && <div className="mt-2 text-sm text-gray-200">Searching...</div>}

      {results.length > 0 && (
        <ul className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 max-h-80 overflow-auto">
          {results.map((result, idx) => {
            const isClickable = !result.student.timeIn;

            return (
              <li
                key={`${result.student.id}-${idx}`}
                className={`px-4 py-2 border-b last:border-b-0 transition-all ${
                  isClickable
                    ? 'cursor-pointer hover:bg-gray-100'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                onClick={() =>
                  isClickable &&
                  setSelectedStudentData({
                    _id: result._id,
                    id: result.student.id,
                    name: result.student.name,
                  })
                }
              >
                <div className="font-medium text-gray-900">{result.student.name}</div>
                <div className="text-xs md:text-sm text-gray-500">Section: {result.section}</div>
                <div className="text-xs md:text-sm text-gray-400">
                  Time-in: {result.student.timeIn || 'Not yet timed-in'}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && query && results.length === 0 && (
        <div className="mt-4 text-sm text-gray-400">No results found.</div>
      )}

      {selectedStudentData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Modal
            name={selectedStudentData.name}
            onClose={() => setSelectedStudentData(null)}
            onConfirm={handleTimeIn}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
