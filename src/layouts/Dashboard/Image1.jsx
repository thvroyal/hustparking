import React from 'react';
import CarBannerImg from '../../assets/img/C9.jpg';

function Image1() {
  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary">
            C9 Campus
          </div>
          <div className="card-body text-center p-2">
            <img
              src={CarBannerImg}
              alt=""
              style={{
                width: '100%',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Image1;
