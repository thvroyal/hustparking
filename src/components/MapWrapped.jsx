import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polygon,
} from 'react-google-maps';
import * as parkingMapData from '../apis/mapApi.json';
import mapStyle from './mapStyle';

function Map() {
  const [selectedPark, setSelectedPark] = useState(0);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedPark(selectedPark + 1);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const options = function (fillColor) {
    return {
      fillColor,
      fillOpacity: 1,
      strokeColor: 'black',
      strokeOpacity: 1,
      strokeWeight: 1,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1,
    };
  };
  return (
    <GoogleMap
      defaultZoom={21.5}
      defaultCenter={{ lat: 21.00553019004566, lng: 105.84252910689219 }}
      defaultOptions={{ styles: mapStyle }}
    >
      {parkingMapData.features.map((park) => {
        if (park.geometry.type === 'Polygon') {
          const paths = park.geometry.coordinates[0].map((point) => {
            const p = {
              lat: point[1],
              lng: point[0],
            };
            return p;
          });
          return (
            <Polygon
              path={paths}
              options={options(park.properties.fillColor)}
              key={park.properties.name}
            />
          );
        } return null;
      })}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export default MapWrapped;
