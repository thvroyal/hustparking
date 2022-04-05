import React, { useEffect, useState } from 'react';
import CarBannerImg from '../../assets/img/D3.jpg';

function Image1() {
  const [reloadImg, setReloadImg] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setReloadImg(CarBannerImg);
      console.log('This will run every second!');
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary">
            D3 Campus
          </div>
          <div className="card-body text-center p-2">
            <img
              role="presentation"
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

export default Image1;
