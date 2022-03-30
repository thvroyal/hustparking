// import {  } from '@react-google-maps/api';
import { string } from 'prop-types';
import React, { useState } from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  InfoWindow, Marker,
} from 'react-google-maps';
import mapStyle from './mapStyle';

function Map({ listFields }) {
  const [showPopup, setShowPopup] = useState(false);

  // const options = {
  //   fillOpacity: 1,
  //   strokeColor: 'black',
  //   strokeOpacity: 1,
  //   strokeWeight: 1,
  //   clickable: false,
  //   draggable: false,
  //   editable: false,
  //   geodesic: false,
  //   zIndex: 1,
  // };

  // const options = { closeBoxURL: '', enableEventPropagation: true, visible: false };
  return (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: 21.00553019004566, lng: 105.84252910689219 }}
      defaultOptions={{ styles: mapStyle }}
    >
      {listFields ? (
        listFields.listOfFields.map((item) => (
          <>
            <Marker
              key={item.id}
              onClick={() => setShowPopup(true)}
              icon={{
                scaledSize: new window.google.maps.Size(80, 80),
              }}
              position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
            >
              {showPopup ? (
                <InfoWindow
                  onCloseClick={() => setShowPopup(false)}
                >
                  <div
                    style={{
                      backgroundColor: 'blue',
                      color: 'white',
                      borderRadius: '1em',
                      padding: '0.2em',
                    }}
                  >
                    {item.name}
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          </>
        ))
      ) : ''}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export default React.memo(MapWrapped);

Map.propTypes = {
  listFields: string.isRequired,
};
