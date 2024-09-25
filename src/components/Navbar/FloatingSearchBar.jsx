import React, { useState } from "react";
import axios from "axios";
import "boxicons";

const SearchBar = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_REACT_API_URL;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = async () => {
    setSearchQuery("");
    setLoading(true);
    try {
      // Jika query kosong, ambil semua list tempat
      const response = await axios.get(`${baseURL}/card/up`);
      onSearchResults(response.data); // Tampilkan semua data
    } catch (error) {
      console.error("Error fetching all places:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!searchQuery) {
        // Jika query kosong, ambil semua list tempat
        const response = await axios.get(`${baseURL}/card/up`);
        onSearchResults(response.data); // Tampilkan semua data
      } else {
        // Gunakan searchQuery sebagai parameter di URL jika ada
        const response = await axios.get(
          `${baseURL}/card/search/${searchQuery}`
        );
        onSearchResults(response.data); // Kirim hasil pencarian ke parent component
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative flex items-center justify-center w-full max-w-lg mx-auto gap-2"
    >
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
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-90 sm:w-80 md:w-96 pl-5 pr-5 py-2 rounded-full border border-color-gold-card  shadow-sm focus:outline-none focus:ring-1 focus:ring-color-gold-card transition duration-300 ease-in-out"
        placeholder="Search Location..."
      />
      {/* Search Button */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-1 bg-color-yellow rounded-full text-black hover:bg-color-gold-card focus:outline-none focus:ring-1 focus:ring-color-gold-card transition duration-300 ease-in-out"
      >
        {loading ? (
          <div className="animate-spin flex justify-center items-center dura">
            <box-icon name="loader" color="#000000" size="sm"></box-icon>
          </div>
        ) : (
          <div className="mt-2">
            <box-icon name="search-alt" color="#000000" size="sm"></box-icon>
          </div>
        )}
      </button>
    </form>
  );
};

export default SearchBar;
