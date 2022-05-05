import React, { useEffect, useState } from 'react';
import CarBannerImgC9Ori from '../../../assets/img/C9_original.jpg';
import CarBannerImgC9 from '../../../assets/img/C9.jpg';

function ImageViewC9() {
  const [reloadImgC9Ori, setReloadImgC9Ori] = useState(CarBannerImgC9Ori);
  const [reloadImgC9, setReloadImgC9] = useState(CarBannerImgC9);

  useEffect(() => {
    const interval = setInterval(() => {
      setReloadImgC9Ori(CarBannerImgC9Ori);
      setReloadImgC9(CarBannerImgC9);
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
                  src={reloadImgC9Ori}
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
                  src={reloadImgC9}
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
