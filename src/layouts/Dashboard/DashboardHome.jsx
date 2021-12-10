import React from 'react';
import { withRouter } from 'react-router';
import CarBannerImg from '../../assets/img/car_banner.svg';

function DashboardHome() {
  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-body text-center p-5">
            <img
              src={CarBannerImg}
              alt=""
              style={{
                width: '50%',
              }}
            />
            <h5 className="font-weight-bold text-primary">HUST- PARKING MANAGEMENT SYSTEM</h5>
            <p>Sponsor by VINIF2019-DA16</p>
            <button className="btn btn-primary btn-lg" type="button">Get Start</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(withRouter(DashboardHome));
