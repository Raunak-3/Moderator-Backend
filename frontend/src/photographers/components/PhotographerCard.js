import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Import the CSS file

const PhotographerCard = ({ photographer }) => {
  // Set the path to the static image located in the public folder
  const imagePath = `${process.env.PUBLIC_URL}/image_photographer/photographer_id.jpg`;

  return (
    <div className="photographer-card">
      {/* Use the single static image for all photographer cards */}
      <img src={imagePath} alt={photographer.name} />
      <div className="card-details">
        <h3>{photographer.name}</h3>
        <p>{photographer.skills}</p>
        <p>{photographer.location}</p>
        <p>₹{photographer.price} onwards</p>
        <p>Rating: {photographer.rating}</p>
        <Link to={`/photographer/${photographer._id}`} className="view-profile">
          View Portfolio
        </Link>
      </div>
    </div>
  );
};

export default PhotographerCard;
