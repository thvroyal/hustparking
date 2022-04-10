import { bool } from 'prop-types';
import React from 'react';
import CarBannerImg from '../../assets/img/profile-1.png';

function SidebarMaps({ toggle }) {
  return (
    <>
      <div
        className={`p-3 d-flex flex-column bg-light position-absolute sidenav ${toggle ? '' : 'toggleSidebar'}`}
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
      </div>
    </>
  );
}

export default SidebarMaps;

SidebarMaps.propTypes = {
  toggle: bool.isRequired,
};
