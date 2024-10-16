import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles.css'; // Ensure this imports your custom styles

const PhotographerDetails = () => {
  const { id } = useParams(); 
  const [photographer, setPhotographer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [activeSection, setActiveSection] = useState('about'); // To toggle between 'About' and 'Review'
  const [isRequestSent, setIsRequestSent] = useState(false); // Booking Request state

  // Fetch photographer details and reviews
  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/photographers/${id}`);
        setPhotographer(res.data);
      } catch (error) {
        console.error('Error fetching photographer:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/reviews/${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchPhotographer();
    fetchReviews();
  }, [id]);

  // Handle new review submission
  const handleReviewSubmit = async () => {
    if (userName && reviewText) {
      const newReview = { userName, reviewText, photographerId: id };
      try {
        await axios.post('http://localhost:5500/api/reviews', newReview); 
        setReviews([...reviews, newReview]);
        setUserName('');
        setReviewText('');
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  // Handle booking request
  const handleBookingRequest = (event) => {
    event.preventDefault(); // Prevent form from submitting/reloading
    // Simulate an API request (dummy logic)
    console.log('Sending booking request...');
    
    // Simulating a 2-second delay to mimic a real API call
    setTimeout(() => {
      console.log('Booking request successfully sent!');
      setIsRequestSent(true);
    }, 1000); // 2 seconds delay
  };

  // Function to download demo PDF
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/path/to/demo.pdf';  // Path to your demo PDF
    link.download = 'portfolio.pdf';
    link.click();
  };

  return (
    <div className="photographer-profile-container">
      {photographer ? (
        <>
          {/* Left-hand side: Enlarged Photo and Section Tabs */}
          <div className="left-side">
            <div className="photographer-image">
              <img src="/image_photographer/portfolio_shoot.jpg" alt="Portfolio Shoot" />
            </div>
            <div className="section-tabs">
              <button
                className={activeSection === 'about' ? 'active-tab' : ''}
                onClick={() => setActiveSection('about')}
              >
                About
              </button>
              <button
                className={activeSection === 'review' ? 'active-tab' : ''}
                onClick={() => setActiveSection('review')}
              >
                Write a Review
              </button>
            </div>

            {activeSection === 'about' && (
              <div className="photographer-details">
                <h1>{photographer.name}</h1>
                <p><strong>Designation:</strong> {photographer.skills}</p>
                <p><strong>Location:</strong> {photographer.location}</p>
                <p><strong>Price:</strong> ₹{photographer.price} onwards</p>
                <p><strong>Rating:</strong> {photographer.rating}</p>
                <p><strong>Reviews:</strong> {reviews.length}</p>
              </div>
            )}

            {activeSection === 'review' && (
              <div className="reviews-section">
                <h2>Write a Review</h2>
                {reviews.length ? (
                  reviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <h4>{review.userName}</h4>
                      <p>{review.reviewText}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available yet.</p>
                )}

                <div className="write-review">
                  <h3>Write a Review</h3>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  ></textarea>
                  <button onClick={handleReviewSubmit}>Submit</button>
                </div>
              </div>
            )}
          </div>

          {/* Right-hand side: Send Message, Download PDF, and Form */}
          <div className="right-side">
            <div className="send-message-section">
              <button className="download-pdf-btn" onClick={handleDownloadPDF}>
                Download Portfolio
              </button>
            </div>

            {/* Form Section */}
            <div className="message-form">
              <h3 className="form-heading"> Want to Book {photographer.name} ?</h3>
              <form className="styled-form" onSubmit={handleBookingRequest}>
                <div className="form-group">
                  <label htmlFor="email-address">Your Amount</label>
                  <input type="number" placeholder="Enter your Bargaining amount" />
                </div>

                <div className="form-group">
                  <label htmlFor="function-date">Joining date*</label>
                  <input type="date" id="function-date" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="duration">Duration (in months)</label>
                  <input type="number" id="duration" placeholder="Enter the duration of the job in months" required />
                </div>

                <div className="form-group">
                  <label htmlFor="details">Details about the Job/Event</label>
                  <textarea id="details" placeholder="Enter Function details"></textarea>
                </div>

                <div className="form-group">
                  <div className="notify-toggle">
                    <label htmlFor="whatsapp-notify">Notify me on Email</label>
                    <label className="switch">
                      <input type="checkbox" id="whatsapp-notify" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isRequestSent}
                >
                  {isRequestSent ? 'Request Sent' : 'Send Booking Request'}
                </button>
              </form>
              <p className="form-footer">
                Complete information ensures you get accurate and timely vendor responses.
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PhotographerDetails;
