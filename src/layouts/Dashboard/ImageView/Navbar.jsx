import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const path = [
  {
    title: 'D3-D5 Campus',
    query: 'D35',
  },
  {
    title: 'C9 Campus',
    query: 'C9',
  },
  {
    title: 'Trần Đại Nghĩa Campus',
    query: 'TĐN',
  },
];
function Navbar() {
  const location = useLocation();
  const queryActive = location.search.split('=')[1];
  return (
    <>
      <nav className="nav nav-borders">
        {path.map((p) => (
          <Link
            className={`nav-link ${queryActive === p.query ? 'active' : ''}`}
            to={`${location.pathname}?tab=${p.query}`}
            key={p.query}
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
