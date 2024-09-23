import React, { useState } from "react";
import "boxicons"; // Pastikan Anda telah menginstall boxicons

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Logic untuk pencarian berdasarkan searchQuery
    console.log("Search for:", searchQuery);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative flex items-center justify-center w-full max-w-lg mx-auto"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-90 sm:w-80 md:w-96 pl-5 pr-5 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        placeholder="Search Location..."
      />

      {/* Clear Button */}
      {searchQuery && (
        <button
          type="button"
          onClick={clearSearch}
          className="right-3 mt-2 focus:outline-none transition duration-300 ease-in-out hover:scale-105"
        >
          <box-icon name="reset" color="#ffffff" size="md"></box-icon>
        </button>
      )}
    </form>
  );
};

export default SearchBar;
