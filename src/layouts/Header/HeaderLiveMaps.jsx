import React from 'react';

function HeaderLiveMaps() {
  return (
    <>
      <header
        className="bg-primary text-white"
        style={{ height: '5%' }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <i className="fas fa-map" />
            </div>
            <div className="text-end">
              <button
                type="button"
                className="btn btn-outline-light me-2"
                style={{
                  padding: '3px 6px',
                  transform: 'translate(16px, 4px)',
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderLiveMaps;
