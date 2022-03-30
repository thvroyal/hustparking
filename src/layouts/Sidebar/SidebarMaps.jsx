import React, { useState } from 'react';
import CarBannerImg from '../../assets/img/profile-1.png';

function SidebarMaps() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <>
      <div
        className="p-3 d-flex flex-column bg-light position-absolute"
        style={{
          width: '280px',
          top: '5%',
          height: '95%',
        }}
      >
        <div>
          <div className="font-weight-bold" style={{ fontSize: '26px' }}>Smart Parking</div>
          <div className="d-flex align-items-center justify-content-between pt-3">
            <div>
              <img
                src={CarBannerImg}
                alt=""
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div>
              <div>Smart Parking of HUST</div>
              <div>Detail</div>
            </div>
          </div>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">Page</li>
          <li className="nav-item">Dashboard</li>
          <li className="nav-item">Data</li>
          <li className="nav-item">Info</li>
        </ul>
        <hr />
        <button
          className="btn btn-primary"
          onClick={() => setToggleSidebar(!toggleSidebar)}
          type="button"
        >
          click
        </button>
      </div>
    </>
  );
}

export default SidebarMaps;
