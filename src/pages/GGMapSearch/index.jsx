import React from 'react';
import { withScriptjs } from 'react-google-maps';
import MapWrapper from './MapWrapper';

export default function GGMapSearch() {
  const MapLoader = withScriptjs(MapWrapper);
  return (
    <div>
      <MapLoader
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`}
        loadingElement={<div style={{ height: '50%' }} />}
      />
    </div>
  );
}
