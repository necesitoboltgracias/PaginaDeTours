import React from 'react';

// Basic styles for the Navbar. In a real app, you'd use CSS files or a styling library.
const navStyles = {
  backgroundColor: '#333',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const logoStyles = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.8rem',
  fontWeight: 'bold',
};

const navLinksStyles = {
  listStyle: 'none',
  display: 'flex',
  margin: 0,
  padding: 0,
};

const navLinkItemStyles = {
  marginLeft: '20px',
};

const navLinkStyles = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
  transition: 'color 0.3s ease',
};

// A simple hover effect can be added with pseudo-classes in CSS,
// or by handling mouseEnter/mouseLeave in JS for inline styles (more verbose).
// For simplicity, direct inline styles are used here.

const Navbar = () => {
  return (
    <nav style={navStyles}>
      <a href="/" style={logoStyles}>
        Punta Cana Tours
      </a>
      <ul style={navLinksStyles}>
        <li style={navLinkItemStyles}>
          <a href="/" style={navLinkStyles}
             onMouseOver={e => e.currentTarget.style.color='#007bff'}
             onMouseOut={e => e.currentTarget.style.color='white'}>
            Home
          </a>
        </li>
        <li style={navLinkItemStyles}>
          <a href="/#tours" style={navLinkStyles}
             onMouseOver={e => e.currentTarget.style.color='#007bff'}
             onMouseOut={e => e.currentTarget.style.color='white'}>
            Tours
          </a>
        </li>
        {/* Future link for admin page */}
        <li style={navLinkItemStyles}>
          <a href="/admin" style={navLinkStyles}
             onMouseOver={e => e.currentTarget.style.color='#007bff'}
             onMouseOut={e => e.currentTarget.style.color='white'}>
            Admin
          </a>
        </li>
        {/* Add more links as needed, e.g., About Us, Contact */}
      </ul>
    </nav>
  );
};

export default Navbar;
