import React, { useState } from 'react';
import '../styles.css'; // Import the CSS file

const FilterBar = ({ handleFilter }) => {
  const locations = [
    { city: 'Delhi', image: `${process.env.PUBLIC_URL}/image_photographer/delhi.jpg` },
    { city: 'Mumbai', image: `${process.env.PUBLIC_URL}/image_photographer/mumbai.jpg` },
    { city: 'Bangalore', image: `${process.env.PUBLIC_URL}/image_photographer/bangalore.jpg` },
    { city: 'Hyderabad', image: `${process.env.PUBLIC_URL}/image_photographer/hyderabad.jpg` },
    { city: 'Kolkata', image: `${process.env.PUBLIC_URL}/image_photographer/mumbai.jpg` },
    { city: 'Jaipur', image: `${process.env.PUBLIC_URL}/image_photographer/delhi.jpg` },
    { city: 'Chennai', image: `${process.env.PUBLIC_URL}/image_photographer/chennai.jpg` },
    // { city: 'Chennai', image: `${process.env.PUBLIC_URL}/image_photographer/chennai.jpg` },
  ];

  const skills = [
    'developer', 
    'photographer', 
    'video editor', 
    'animator', 
    'illustrator', 
    'content writer', 
    'graphic designer', 
    'social media manager'
  ];

  const [selectedSkill, setSelectedSkill] = useState('');

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    handleFilter(undefined, skill); // Call handleFilter with skill
  };

  return (
    <div className="filter-container">
      {/* Location Filter Section */}
      <div className="filter-section">
        <h4>Filter by Location:</h4>
        <div className="filter-bar">
          {locations.map(location => (
            <div
              key={location.city}
              className="filter-item"
              onClick={() => handleFilter(location.city, selectedSkill)}
            >
              <img src={location.image} alt={location.city} />
              <p>{location.city}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Filter Section */}
      <div className="filter-section-skills">
        <h4>Filter by Jobs:</h4>
        <div className="filter-bar-skills">
          {skills.map(skill => (
            <div
              key={skill}
              className="filter-item"
              onClick={() => handleSkillClick(skill)}
            >
              <p>{skill.charAt(0).toUpperCase() + skill.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
