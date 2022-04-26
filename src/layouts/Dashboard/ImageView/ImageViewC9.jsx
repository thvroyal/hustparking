import React, { useEffect, useState } from 'react';
import CarBannerImgD3 from '../../../assets/img/D3.jpg';
import CarBannerImgD3Ori from '../../../assets/img/D3_original.jpg';

function ImageViewC9() {
  const [reloadImgD3, setReloadImgD3] = useState(CarBannerImgD3);
  const [reloadImgD3Ori, setReloadImgD3Ori] = useState(CarBannerImgD3Ori);

  useEffect(() => {
    const interval = setInterval(() => {
      setReloadImgD3(CarBannerImgD3);
      setReloadImgD3Ori(CarBannerImgD3Ori);
      console.log('This will run every 30 seconds!');
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary">
            D9 Campus
          </div>
          <div className="container">
            <div className="row">
              <div className="card-body text-center p-2 col-6">
                <h3>D9 Original</h3>
                <img
                  role="presentation"
                  src={reloadImgD3Ori}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
              <div className="card-body text-center p-2 col-6">
                <h3>D9 Result</h3>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageViewC9;
