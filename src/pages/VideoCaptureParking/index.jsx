import React from 'react';

const URL_LIVE = 'http://192.168.2.12:8000/stream';

export default function VideoCaptureParking() {
  return (
    <div>
      <img
        src={URL_LIVE}
        alt="video"
        style={{
          width: '100%',
        }}
      />
    </div>
  );
}
