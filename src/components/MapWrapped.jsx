import { Autocomplete } from '@react-google-maps/api';
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
  console.log(showPopup);
  const [latPosition, setLatPosition] = useState(21.00553019004566);
  const [longPosition, setLongPosition] = useState(105.84252910689219);

  const focusMarker = (lat, long) => {
    setShowPopup(true);
    setLatPosition(lat);
    setLongPosition(long);
  };

  // const options = { closeBoxURL: '', enableEventPropagation: true, visible: false };
  return (
    <>
      <div
        className="d-flex justify-content-around align-items-center bg-white"
        style={{
          width: '573px',
          height: '69px',
          position: 'fixed',
          top: '7%',
          left: '30%',
        }}
      >
        <div>
          <Autocomplete>
            <input type="text" placeholder="Origin" />
          </Autocomplete>
        </div>
        <div>
          <Autocomplete>
            <input type="text" placeholder="Destination" />
          </Autocomplete>
        </div>
        <button type="button" className="btn btn-primary">
          Cal router
        </button>
      </div>

      <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: latPosition, lng: longPosition }}
        defaultOptions={{ styles: mapStyle }}
      >
        {listFields ? (
          listFields.listOfFields.map((item) => (
            <>
              <Marker
                key={item.id}
                onClick={() => focusMarker(parseFloat(item.latitude), parseFloat(item.longitude))}
                icon={{
                  scaledSize: new window.google.maps.Size(80, 80),
                }}
                position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
              >
                <InfoWindow
                  onCloseClick
                >
                  <div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="row">#</th>
                          <th scope="row">First</th>
                          <th scope="row">Last</th>
                          <th scope="row">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="col">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </InfoWindow>
              </Marker>
            </>
          ))
        ) : ''}
      </GoogleMap>
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export default React.memo(MapWrapped);

Map.propTypes = {
  listFields: string.isRequired,
};
