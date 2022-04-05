import React, { useEffect, useState } from 'react';
import CarBannerImg from '../../assets/img/D5.jpg';

function Image2() {
  const [reloadImg, setReloadImg] = useState(CarBannerImg);

  useEffect(() => {
    const interval = setInterval(() => {
      setReloadImg(CarBannerImg);
      console.log('This will run every 10 min!');
    }, 1200000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary">
            D5 Campus
          </div>
          <div className="card-body text-center p-2">
            <img
              src={reloadImg}
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

export default Image2;
