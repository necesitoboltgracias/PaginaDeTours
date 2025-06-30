import React, { useState, useEffect } from 'react'; // Added useEffect
import Layout from '../components/Layout';
import { addTour as addTourSupabase, supabase } from '../lib/supabaseClient'; // Import supabase for auth check
import { useRouter } from 'next/router'; // To redirect if not admin

const AdminPage = () => {
  const router = useRouter();
  const [tourName, setTourName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrls, setImageUrls] = useState(''); // Comma-separated URLs
  const [location, setLocation] = useState('Punta Cana'); // Default location

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    if (!tourName || !description || !price || !imageUrls) {
        setError("Please fill in all required fields.");
        setSubmitting(false);
        return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
        setError("Please enter a valid price.");
        setSubmitting(false);
        return;
    }

    const imagesArray = imageUrls.split(',').map(url => url.trim()).filter(url => url);
    if (imagesArray.length === 0) {
        setError("Please provide at least one image URL.");
        setSubmitting(false);
        return;
    }

    // const newTour = {
    //   name: tourName,
    //   description,
    //   price: priceNumber,
    //   image_urls: imagesArray,
    //   location,
    // };

    // try {
    //   // const { data, error: insertError } = await supabase
    //   //   .from('tours')
    //   //   .insert([newTour])
    //   //   .select(); // Optionally select to get the inserted data back

    //   // if (insertError) {
    //   //   throw insertError;
    //   // }

    //   // console.log('Tour added:', data);
    //   setSuccessMessage(`Tour "${tourName}" added successfully!`);
    //   // Reset form
    //   setTourName('');
    //   setDescription('');
    //   setPrice('');
    //   setImageUrls('');
    //   setLocation('Punta Cana');

    // } catch (err) {
    //   console.error('Error adding tour:', err);
    //   setError(`Failed to add tour: ${err.message}`);
    // } finally {
    //   setSubmitting(false);
    // }

    // Placeholder logic:
    console.log('Submitting tour (placeholder):', { tourName, description, price: priceNumber, imageUrls: imagesArray, location });
    setSuccessMessage(`Tour "${tourName}" added successfully (placeholder)!`);
    setTourName('');
    setDescription('');
    setPrice('');
    setImageUrls('');
    setLocation('Punta Cana');
    setSubmitting(false);
  };

  const pageStyles = { padding: '20px', maxWidth: '700px', margin: '0 auto' };
  const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
  const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
  const labelStyle = { marginBottom: '5px', fontWeight: 'bold', display: 'block' };
  const buttonStyle = { padding: '12px 18px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' };
  const errorStyle = { color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '4px', background: '#ffebee'};
  const successStyle = { color: 'green', marginBottom: '10px', padding: '10px', border: '1px solid green', borderRadius: '4px', background: '#e8f5e9'};


  // For a real admin page, you'd protect this route (e.g., with Supabase Auth)
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     if (!user) {
  //       // Redirect to login or show unauthorized message
  //       // router.push('/login');
  //       setError("Access Denied. Please log in as an admin.");
  //     }
  //     // else if (user.role !== 'admin') { // If you have roles
  //     //  setError("Access Denied. Admin privileges required.");
  //     // }
  //   };
  //   // checkUser();
  // }, []);


  return (
    <Layout>
      <div style={pageStyles}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Admin - Add New Tour</h1>

        {error && <div style={errorStyle}>{error}</div>}
        {successMessage && <div style={successStyle}>{successMessage}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label htmlFor="tourName" style={labelStyle}>Tour Name:</label>
            <input type="text" id="tourName" value={tourName} onChange={e => setTourName(e.target.value)} required style={inputStyle} />
          </div>
          <div>
            <label htmlFor="description" style={labelStyle}>Description:</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows="5" style={inputStyle}></textarea>
          </div>
          <div>
            <label htmlFor="price" style={labelStyle}>Price (USD):</label>
            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required step="0.01" min="0" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="imageUrls" style={labelStyle}>Image URLs (comma-separated):</label>
            <input type="text" id="imageUrls" value={imageUrls} onChange={e => setImageUrls(e.target.value)} required placeholder="e.g., https://example.com/img1.jpg, https://example.com/img2.jpg" style={inputStyle} />
            <small style={{display: 'block', marginTop: '5px', color: '#555'}}>Enter one or more image URLs, separated by commas.</small>
          </div>
          <div>
            <label htmlFor="location" style={labelStyle}>Location:</label>
            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required style={inputStyle} />
          </div>
          <button type="submit" disabled={submitting} style={{...buttonStyle, backgroundColor: submitting ? '#ccc' : '#28a745' }}>
            {submitting ? 'Adding Tour...' : 'Add Tour'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AdminPage;
