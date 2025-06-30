import React from 'react';

const ReviewCard = ({ review }) => {
  if (!review) {
    return null;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#ffc107' : '#e0e0e0', fontSize: '1.2em' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '16px',
      margin: '12px 0',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ margin: 0, fontSize: '1.1em' }}>{review.user_name || 'Anonymous'}</h4>
        <div>{renderStars(review.rating)}</div>
      </div>
      <p style={{ fontSize: '0.95em', color: '#333', margin: 0 }}>
        {review.comment || 'No comment provided.'}
      </p>
      <p style={{ fontSize: '0.8em', color: '#777', marginTop: '8px', textAlign: 'right' }}>
        {new Date(review.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;
