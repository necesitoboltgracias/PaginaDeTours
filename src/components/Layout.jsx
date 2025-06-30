import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Basic styles for the Layout
const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Ensures footer is at the bottom even on short pages
};

const mainContentStyle = {
  flex: '1', // Allows main content to grow and fill available space
  padding: '20px', // Add some padding around the main content
  // Potentially set a max-width and margin: auto for centered content:
  // maxWidth: '1200px',
  // margin: '0 auto',
};

const Layout = ({ children }) => {
  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={mainContentStyle}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
