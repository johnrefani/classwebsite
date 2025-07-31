"use client";
import React, { useState, useRef, useEffect } from "react";
import { ClassInfo } from "@/types";

interface DropdownProps {
  onSelect: (section: string) => void;
}

interface ApiResponse {
  success: boolean;
  data?: ClassInfo[];
  error?: string;
}

const Dropdown = ({ onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all sections on mount
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`/api/classinfo/filter`);
        const data: ApiResponse = await response.json();
        if (data.success && data.data) {
          const uniqueSections = Array.from(new Set(data.data.map((item) => item.section)));
          setSections(uniqueSections);
          if (uniqueSections.length > 0) {
            setSelectedSection(uniqueSections[0]);
            onSelect(uniqueSections[0]);
          }
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };
    fetchSections();
  }, [onSelect]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (section: string) => {
    setSelectedSection(section);
    onSelect(section);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 text-xs md:text-sm font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition"
      >
        {selectedSection}
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 10 6"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-md border border-gray-100">
          <ul className="py-1 text-xs md:text-sm text-gray-700">
            {sections.map((section) => (
              <li key={section}>
                <button
                  onClick={() => handleSelect(section)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {section}
                </button>
              </li>
            ))}
            {sections.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No sections found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;