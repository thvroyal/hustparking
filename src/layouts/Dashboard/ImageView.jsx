import React, { useEffect, useState } from 'react';
import CarBannerImgD3 from '../../assets/img/D3.jpg';
import CarBannerImgD5 from '../../assets/img/D5.jpg';

function ImageView() {
  const [reloadImgD5, setReloadImgD5] = useState(CarBannerImgD5);
  const [reloadImgD3, setReloadImgD3] = useState(CarBannerImgD3);

  useEffect(() => {
    const interval = setInterval(() => {
      setReloadImgD3(CarBannerImgD3);
      setReloadImgD5(CarBannerImgD5);
      console.log('This will run every 10 min!');
    }, 1200000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary">
            D3-D5 Campus
          </div>
          <div className="container">
            <div className="row">
              <div className="card-body text-center p-2 col-6">
                <img
                  role="presentation"
                  src={reloadImgD3}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
              <div className="card-body text-center p-2 col-6">
                <img
                  role="presentation"
                  src={reloadImgD3}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="card-body text-center p-2 col-6">
                <img
                  role="presentation"
                  src={reloadImgD5}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
              <div className="card-body text-center p-2 col-6">
                <img
                  role="presentation"
                  src={reloadImgD5}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageView;
