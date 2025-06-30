import React from 'react';

// Basic styles for the Footer
const footerStyles = {
  backgroundColor: '#333',
  color: 'white',
  textAlign: 'center',
  padding: '1.5rem 2rem',
  marginTop: 'auto', // Pushes footer to the bottom if main content is short
  fontSize: '0.9rem'
};

const linkStyles = {
  color: '#007bff',
  textDecoration: 'none',
  margin: '0 5px',
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyles}>
      <p>&copy; {currentYear} Punta Cana Tours. All Rights Reserved.</p>
      <p>
        Inspired by
        <a href="https://gotuuri.com" target="_blank" rel="noopener noreferrer" style={linkStyles}>Gotuuri</a>
        and
        <a href="https://www.viator.com" target="_blank" rel="noopener noreferrer" style={linkStyles}>Viator</a>.
      </p>
      {/* Add more footer content or links as needed */}
      {/* <p>
        <a href="/privacy-policy" style={linkStyles}>Privacy Policy</a> |
        <a href="/terms-of-service" style={linkStyles}>Terms of Service</a>
      </p> */}
    </footer>
  );
};

export default Footer;
