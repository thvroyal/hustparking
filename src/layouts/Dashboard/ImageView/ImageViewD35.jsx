import React from 'react';

function ImageViewD35() {
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
                  src="http://202.191.56.104:5518/original-d3"
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
                  src="http://202.191.56.104:5518/processed-d3"
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
                  src="http://202.191.56.104:5518/original-d5"
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
                  src="http://202.191.56.104:5518/processed-d5"
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
