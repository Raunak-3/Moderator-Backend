import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotographerCard from '../components/PhotographerCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar'; // Import the SearchBar
import '../styles.css'; // Import the CSS file

const Home = () => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);

  useEffect(() => {
    // Fetch all photographers initially
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5500/api/photographers/');
      setPhotographers(result.data);
      setFilteredPhotographers(result.data);
    };
    fetchData();
  }, []);

  // Handle filter based on location and skill
  const handleFilter = (location, skill) => {
    let filtered = photographers;

    // Filter by location if specified
    if (location) {
      filtered = filtered.filter((p) => p.location.toLowerCase() === location.toLowerCase());
    }

    // Filter by skill if specified
    if (skill) {
      filtered = filtered.filter((p) => p.skills.toLowerCase().includes(skill.toLowerCase()));
    }

    // Update the filtered photographers
    setFilteredPhotographers(filtered);
  };

  return (
    <div>
      {/* Fixed header */}
      <div className="header">Artists</div>

      {/* Scrollable content */}
      <div className="content">
        <SearchBar setFilteredPhotographers={setFilteredPhotographers} /> {/* Add SearchBar */}
        <FilterBar handleFilter={handleFilter} />
        <div className="photographer-list">
          {filteredPhotographers.map((photographer) => (
            <PhotographerCard key={photographer._id} photographer={photographer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
