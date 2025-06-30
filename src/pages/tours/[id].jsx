import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ReviewCard from '../../components/ReviewCard';
import { fetchTourById, fetchReviewsForTour, addReview as addReviewSupabase } from '../../lib/supabaseClient';

const TourDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get tour ID from URL

  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState('');


  // Review form state
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(null);

  useEffect(() => {
    const loadTourData = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const tourData = await fetchTourById(id);
          if (tourData) {
            setTour(tourData);
            if (tourData.image_urls && tourData.image_urls.length > 0) {
              setCurrentImage(tourData.image_urls[0]);
            } else {
              setCurrentImage('https://via.placeholder.com/800x500.png?text=Tour+Image');
            }
            const reviewsData = await fetchReviewsForTour(id);
            setReviews(reviewsData || []);
          } else {
            setError('Tour not found.');
            setTour(null);
            setReviews([]);
          }
        } catch (err) {
          console.error('Error loading tour data:', err);
          setError(err.message || 'Failed to load tour details.');
          setTour(null);
          setReviews([]);
        } finally {
          setLoading(false);
        }
      }
    };

    loadTourData();
  }, [id]);


  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError(null);
    setReviewSuccess(null);
    if (!userName.trim() || !comment.trim()) {
      setReviewError('Please provide your name and a comment.');
      return;
    }
    if (!id) {
        setReviewError('Tour ID is missing. Cannot submit review.');
        return;
    }

    setSubmittingReview(true);
    const newReviewPayload = {
        tour_id: id,
        user_name: userName,
        rating: parseInt(rating, 10),
        comment
    };

    try {
      const addedReview = await addReviewSupabase(newReviewPayload);
      if (addedReview) {
        setReviews(prevReviews => [addedReview, ...prevReviews]);
        setUserName('');
        setRating(5);
        setComment('');
        setReviewSuccess('Review submitted successfully!');
      } else {
        throw new Error("Review data was not returned from the server.");
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setReviewError(`Failed to submit review: ${err.message}`);
    } finally {
      setSubmittingReview(false);
    }
  };

  const pageStyles = { padding: '20px', maxWidth: '900px', margin: '0 auto' };
  const imageGalleryStyles = { display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px', paddingBottom: '10px' };
  const mainImageStyle = { width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' };
  const thumbnailImageStyle = { width: '100px', height: '70px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: '2px solid transparent' };
  // const activeThumbnailStyle = { ...thumbnailImageStyle, borderColor: '#007bff'}; // For later
  const detailsSectionStyle = { marginBottom: '30px' };
  const reviewSectionStyle = { marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '30px' };
  const reviewFormStyle = { background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '20px' };
  const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
  const buttonStyle = { padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

  if (loading) return <Layout><div style={pageStyles}><p>Loading tour details...</p></div></Layout>;
  if (error) return <Layout><div style={pageStyles}><p>Error: {error}</p></div></Layout>;
  if (!tour) return <Layout><div style={pageStyles}><p>Tour not found.</p></div></Layout>;

  const [currentImage, setCurrentImage] = useState(tour.image_urls && tour.image_urls.length > 0 ? tour.image_urls[0] : 'https://via.placeholder.com/800x500.png?text=Tour+Image');

  return (
    <Layout>
      <div style={pageStyles}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>{tour.name}</h1>
        <p style={{ fontSize: '1.2rem', color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>
          Price: ${Number(tour.price).toFixed(2)}
        </p>

        <img src={currentImage} alt={tour.name} style={mainImageStyle} />

        {tour.image_urls && tour.image_urls.length > 1 && (
          <div style={imageGalleryStyles}>
            {tour.image_urls.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`${tour.name} thumbnail ${index + 1}`}
                style={imgUrl === currentImage ? {...thumbnailImageStyle, borderColor: '#007bff'} : thumbnailImageStyle}
                onClick={() => setCurrentImage(imgUrl)}
              />
            ))}
          </div>
        )}

        <div style={detailsSectionStyle}>
          <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid #007bff', paddingBottom: '5px', marginBottom: '15px' }}>Tour Description</h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>{tour.description}</p>
        </div>

        {tour.includes && tour.includes.length > 0 && (
            <div style={detailsSectionStyle}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>What's Included:</h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555' }}>
                    {tour.includes.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        )}

        {tour.duration && (
            <div style={detailsSectionStyle}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Duration:</h3>
                <p style={{ color: '#555' }}>{tour.duration}</p>
            </div>
        )}

        <div style={{textAlign: 'center', margin: '30px 0'}}>
             <button style={{...buttonStyle, padding: '15px 30px', fontSize: '1.2rem'}}>Book Now</button>
        </div>


        <div style={reviewSectionStyle}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Customer Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map(review => <ReviewCard key={review.id} review={review} />)
          ) : (
            <p>No reviews yet for this tour. Be the first to leave one!</p>
          )}

          <div style={reviewFormStyle}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div>
                <label htmlFor="userName" style={{display: 'block', marginBottom: '5px'}}>Your Name:</label>
                <input type="text" id="userName" value={userName} onChange={e => setUserName(e.target.value)} required style={inputStyle} />
              </div>
              <div>
                <label htmlFor="rating" style={{display: 'block', marginBottom: '5px'}}>Rating:</label>
                <select id="rating" value={rating} onChange={e => setRating(Number(e.target.value))} required style={inputStyle}>
                  <option value="5">5 Stars (Excellent)</option>
                  <option value="4">4 Stars (Great)</option>
                  <option value="3">3 Stars (Good)</option>
                  <option value="2">2 Stars (Fair)</option>
                  <option value="1">1 Star (Poor)</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment" style={{display: 'block', marginBottom: '5px'}}>Comment:</label>
                <textarea id="comment" value={comment} onChange={e => setComment(e.target.value)} required rows="4" style={inputStyle}></textarea>
              </div>
              <button type="submit" disabled={submittingReview} style={buttonStyle}>
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TourDetailPage;
