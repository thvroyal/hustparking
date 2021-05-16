import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const path = [
  {
    title: 'Profile User',
    path: '/home/profile',
  },
  {
    title: 'Edit Profile',
    path: '/home/edit_profile',
  },
  {
    title: 'Security',
    path: '/home/security',
  },
];
function Navbar() {
  const location = useLocation();
  return (
    <>
      <nav className="nav nav-borders">
        {path.map((p) => (
          <Link
            className={`nav-link ${
              location.search === p.path ? 'active ml-0' : ''
            }`}
            to={p.path}
            key={p.path}
          >
            {p.title}
          </Link>
        ))}
      </nav>
      <hr className="mt-0 mb-4" />
    </>
  );
}

export default React.memo(Navbar);
