import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css'; // Import the CSS file

const SearchBar = ({ setFilteredPhotographers }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Local state for the search term
  const [error, setError] = useState(''); // State to handle errors if no photographers found

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update the search term as the user types
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from reloading

    try {
      // Fetch photographers based on the search term
      const result = await axios.get(`http://localhost:5500/api/photographers/search/${searchTerm}`);
      if (result.data.length === 0) {
        setError('No photographers found for this search term');
        setFilteredPhotographers([]); // Clear the list if no data found
      } else {
        setFilteredPhotographers(result.data); // Update the filtered photographers
        setError(''); // Clear any previous error
      }
    } catch (err) {
      console.error('Error fetching photographers:', err);
      setError('Error fetching photographers');
      setFilteredPhotographers([]); // Clear the list if there's an error
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a city or skills..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button type="submit" className="search-submit">
          Search
        </button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Display error if any */}
    </div>
  );
};

export default SearchBar;
