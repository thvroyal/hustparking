import React, { useEffect, useState } from 'react';
import CarBannerImgTĐNOri from '../../../assets/img/TDN_original.jpg';
import CarBannerImgTĐN from '../../../assets/img/TDN.jpg';

function ImageViewTĐN() {
  const [reloadImgTĐNOri, setReloadImgTĐNOri] = useState();
  const [reloadImgTĐN, setReloadImgTĐN] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setReloadImgTĐNOri(CarBannerImgTĐNOri);
      setReloadImgTĐN(CarBannerImgTĐN);
      console.log('This will run every 30 seconds!');
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary">
            Trần Đại Nghĩa Campus
          </div>
          <div className="container">
            <div className="row">
              <div className="card-body text-center p-2 col-6">
                <h3>TĐN Original</h3>
                <img
                  role="presentation"
                  src={reloadImgTĐNOri}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
              <div className="card-body text-center p-2 col-6">
                <h3>TĐN Result</h3>
                <img
                  role="presentation"
                  src={reloadImgTĐN}
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

export default ImageViewTĐN;
