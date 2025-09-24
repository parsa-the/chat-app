"use client";

import React from "react";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full max-w-xs px-3 py-2 border rounded-lg focus:outline-none"
    />
  );
};

export default SearchBar;
