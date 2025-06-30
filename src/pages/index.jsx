import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TourCard from '../components/TourCard';
import { fetchAllTours } from '../lib/supabaseClient';

const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTours = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllTours();
        setTours(data || []); // Ensure tours is an array even if data is null
      } catch (err) {
        console.error('Error fetching tours:', err);
        setError(err.message || 'Failed to fetch tours.');
        setTours([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    loadTours();
  }, []);

  const pageStyles = {
    textAlign: 'center',
    padding: '20px'
  };

  const heroSectionStyles = {
    background: 'url(https://images.unsplash.com/photo-1563399009846-4806ba67671a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80) no-repeat center center',
    backgroundSize: 'cover',
    color: 'white',
    padding: '80px 20px',
    borderRadius: '8px',
    marginBottom: '40px',
    textAlign: 'center'
  };

  const heroTitleStyles = {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
    margin: '0 0 10px 0'
  };

  const heroSubtitleStyles = {
    fontSize: '1.4rem',
    textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
    marginBottom: '20px'
  };

  const tourGridStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '20px'
  };

  if (loading) {
    return <Layout><div style={pageStyles}><p>Loading tours...</p></div></Layout>;
  }

  if (error) {
    return <Layout><div style={pageStyles}><p>Error loading tours: {error}</p></div></Layout>;
  }

  return (
    <Layout>
      <div style={pageStyles}>
        <div style={heroSectionStyles}>
          <h1 style={heroTitleStyles}>Explore the Best of Punta Cana</h1>
          <p style={heroSubtitleStyles}>Unforgettable experiences await you in paradise.</p>
          {/* Optional: Search bar or call to action button */}
        </div>

        <h2 id="tours" style={{ fontSize: '2rem', marginBottom: '30px', color: '#333' }}>Our Featured Tours</h2>
        {tours.length > 0 ? (
          <div style={tourGridStyles}>
            {tours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <p>No tours available at the moment. Please check back later!</p>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
