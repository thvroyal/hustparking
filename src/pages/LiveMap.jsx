import React from 'react';
import MapWrapped from '../components/MapWrapped';

function LiveMap() {
  console.log('update!');
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`;
  return (
    <div className="row" style={{ height: '100vh', width: '100vw' }}>
      <div className="col-xl-9">
        <MapWrapped
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
      <div className="col-xl-3 mt-3">
        <h6 className="text-uppercase font-weight-bold text-dark">Tracking Status</h6>
      </div>
    </div>
  );
}

export default LiveMap;
