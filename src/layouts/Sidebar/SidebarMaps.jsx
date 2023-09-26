import { bool } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import CarBannerImg from '../../assets/img/profile-1.png';

// eslint-disable-next-line react/prop-types
function SidebarMaps({ toggle, id, listFields }) {
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
              <div>Detail of parking</div>
            </div>
          </div>
        </div>
        <hr />
        {listFields ? (
          // eslint-disable-next-line react/prop-types
          listFields.listOfFields
            // eslint-disable-next-line react/prop-types
            .filter((item) => item.id === id)
            .map((item) => (
              <ul className="nav nav-pills flex-column mb-auto" key={item.id}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>ID</div>
                  <li className="nav-item">{item.id}</li>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Name</div>
                  <li className="nav-item">{item.name}</li>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Status</div>
                  <li className="nav-item">{item.openstatus}</li>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Price</div>
                  <li className="nav-item">{item.price}</li>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Total book</div>
                  <li className="nav-item">{item.totalBook}</li>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Busy slot</div>
                  <li className="nav-item">{item.busySlot}</li>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Total slot</div>
                  <li className="nav-item">{item.totalSlot}</li>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>Detail</div>
                  <li className="nav-item text-break ml-5">{item.details ? item.details : 'Loading..............................................................'}</li>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Link to="/home">
                    <div style={{ cursor: 'pointer' }}>Đặt vé xe</div>
                  </Link>
                </div>
              </ul>
            ))
        ) : ''}
        <hr />
      </div>
    </>
  );
}

export default SidebarMaps;

SidebarMaps.propTypes = {
  toggle: bool.isRequired,
};
