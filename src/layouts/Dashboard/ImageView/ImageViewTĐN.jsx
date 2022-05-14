import React from 'react';

function ImageViewTĐN() {
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
                <h3>Trần Đại Nghĩa Original</h3>
                <img
                  role="presentation"
                  src="http://42.114.119.40:5000/c9_original"
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
              <div className="card-body text-center p-2 col-6">
                <h3>Trần Đại Nghĩa Result</h3>
                <img
                  role="presentation"
                  src="http://42.114.119.40:5000/c9"
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
