import React from 'react';

function ImageViewC9() {
  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary">
            C9 Campus
          </div>
          <div className="container">
            <div className="row">
              <div className="card-body text-center p-2 col-6">
                <h3>C9 Original</h3>
                <img
                  role="presentation"
                  src="http://113.22.128.249:5000/c9_original"
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </div>
              <div className="card-body text-center p-2 col-6">
                <h3>C9 Result</h3>
                <img
                  role="presentation"
                  src="http://113.22.128.249:5000/c9"
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
