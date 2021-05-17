import React from 'react';
import Navbar from '../../layouts/User/Profile/Navbar';

function Profile() {
  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col-md-5">
          {/*  Avatar card */}
          <div className="flex-center flex-column">
            <div className="position-relative">
              <button
                className="flex-center rounded-circle position-absolute bg-primary border border-3 border-white text-white"
                style={{
                  width: '35px',
                  height: '35px',
                  bottom: '25px',
                  right: '30px',
                }}
                type="button"
              >
                <i className="fas fa-pen small" />

              </button>
              <img className="rounded-circle mb-4" src="https://picsum.photos/300/300/" alt="Avatar" width="200" />
            </div>
            <h3 className="text-dark">Hoang Viet</h3>
            <p>Status</p>
          </div>
        </div>
        <div className="col">
          {/* TODO Infor user card */}
          <div className="card">
            <div className="card-header">
              Detail Information
            </div>
            <div className="card-body">
              <div id="info" className="mb-4">
                <p className="small text-uppercase mb-0 ml-1">fullname</p>
                <h5 className="text-dark">Ta Hoang Viet</h5>
              </div>
              <div id="info" className="mb-4">
                <p className="small text-uppercase mb-0 ml-1">fullname</p>
                <h5 className="text-dark">Ta Hoang Viet</h5>
              </div>
              <div id="info" className="mb-4">
                <p className="small text-uppercase mb-0 ml-1">fullname</p>
                <h5 className="text-dark">Ta Hoang Viet</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
