import React from 'react';

const TourCard = ({ tour }) => {
  if (!tour) {
    return null;
  }

  // Default image if no images are available
  const imageUrl = tour.image_urls && tour.image_urls.length > 0
    ? tour.image_urls[0]
    : 'https://via.placeholder.com/300x200.png?text=Tour+Image';

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      maxWidth: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img
        src={imageUrl}
        alt={tour.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '4px'
        }}
      />
      <h3 style={{ marginTop: '12px', fontSize: '1.25em' }}>{tour.name}</h3>
      <p style={{ fontSize: '0.9em', color: '#555' }}>
        {tour.description ? tour.description.substring(0, 100) + '...' : 'No description available.'}
      </p>
      <p style={{ fontWeight: 'bold', fontSize: '1.1em', color: '#007bff' }}>
        ${tour.price ? Number(tour.price).toFixed(2) : 'N/A'}
      </p>
      <a
        href={`/tours/${tour.id}`}
        style={{
          display: 'inline-block',
          marginTop: '10px',
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        View Details
      </a>
    </div>
  );
};

export default TourCard;
