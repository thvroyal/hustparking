import React, { useEffect, useState } from 'react';
import CarBannerImgD3 from '../../../assets/img/D3.jpg';
import CarBannerImgD3Ori from '../../../assets/img/D3_original.jpg';
import CarBannerImgD5 from '../../../assets/img/D5.jpg';
import CarBannerImgD5Ori from '../../../assets/img/D5_original.jpg';

function ImageViewD35() {
  const [reloadImgD5, setReloadImgD5] = useState();
  const [reloadImgD3, setReloadImgD3] = useState();
  const [reloadImgD3Ori, setReloadImgD3Ori] = useState();
  const [reloadImgD5Ori, setReloadImgD5Ori] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setReloadImgD3(CarBannerImgD3);
      setReloadImgD5(CarBannerImgD5);
      setReloadImgD3Ori(CarBannerImgD3Ori);
      setReloadImgD5Ori(CarBannerImgD5Ori);
      console.log('This will run every 5 seconds!');
    }, 2000);
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
                <h3>D3 Original</h3>
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
                <h3>D3 Result</h3>
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
                <h3>D5 Original</h3>
                <img
                  role="presentation"
                  src={reloadImgD5Ori}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
              <div className="card-body text-center p-2 col-6">
                <h3>D5 Result</h3>
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

export default ImageViewD35;
