import { Autocomplete } from '@react-google-maps/api';
import { string } from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';
import SidebarMaps from '../layouts/Sidebar/SidebarMaps';

function Map({ listFields }) {
  const [showPopup, setShowPopup] = useState(false);
  const [latPosition, setLatPosition] = useState();
  const [longPosition, setLongPosition] = useState();
  const [latOfMe, setLat] = useState();
  const [longOfMe, setLong] = useState();

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [toggle, handleToggle] = useState(false);
  const [id, setId] = useState();
  const originRef = useRef();
  const destiantionRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatPosition(position.coords.latitude);
      setLongPosition(position.coords.longitude);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    console.log(originRef.current.value);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
  };

  // eslint-disable-next-line no-shadow
  const focusMarker = (id, latitude, longitude) => {
    setLatPosition(latitude);
    setLongPosition(longitude);
    setShowPopup(!showPopup);
    handleToggle(!toggle);
    setId(id);
  };
  // const options = { closeBoxURL: '', enableEventPropagation: true, visible: false };
  return (
    <>
      <div
        className="bg-white shadow p-3 bg-body"
        style={{
          width: '573px',
          height: '102px',
          position: 'absolute',
          top: '5%',
          left: '27%',
          borderRadius: '2.35rem',
        }}
      >
        <form className="form-inline d-flex justify-content-around align-items-center">
          <label className="sr-only" htmlFor="inlineFormInputName2">Origin</label>
          <Autocomplete>
            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Origin" ref={originRef} />
          </Autocomplete>
          <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Destination</label>
          <div className="input-group mb-2 mr-sm-2">
            <Autocomplete>
              <input type="text" className="form-control" placeholder="Destination" ref={destiantionRef} />
            </Autocomplete>
          </div>
          <div>
            <button type="button" className="btn btn-primary mb-2 mr-1" onClick={() => calculateRoute()}>Calc</button>
            <button
              className="btn btn-primary mb-2"
              type="button"
              onClick={() => clearRoute()}
            >
              <i style={{ transform: 'rotateZ(45deg)', marginRight: '4px' }} className="fas fa-plus ml-1" />
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ paddingLeft: '6px' }}>{`Distance: ${distance}`}</div>
          <div style={{ paddingRight: '37px' }}>{`Duration: ${duration}`}</div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginRight: '30px' }}
          >
            <i className="fas fa-location-arrow" />
          </button>
        </div>
      </div>

      {latPosition && longPosition ? (
        <GoogleMap
          // eslint-disable-next-line no-shadow
          zoom={15}
          center={{ lat: latPosition, lng: longPosition }}
        >
          {listFields ? (
            listFields.listOfFields.map((item) => (
              <Marker
                key={item.id}
                // eslint-disable-next-line max-len
                onClick={() => focusMarker(item.id, parseFloat(item.latitude), parseFloat(item.longitude))}
                icon={{
                  scaledSize: new window.google.maps.Size(80, 80),
                }}
                position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
              />
            ))
          ) : 'Loading...'}
          <Marker
            icon={{
              scaledSize: new window.google.maps.Size(80, 80),
            }}
            position={{ lat: latOfMe, lng: longOfMe }}
          />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      ) : 'Loading...'}

      <SidebarMaps
        toggle={toggle}
        id={id}
        listFields={listFields}
      />
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export default React.memo(MapWrapped);

Map.propTypes = {
  listFields: string.isRequired,
};
