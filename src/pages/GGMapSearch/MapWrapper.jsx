import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import * as parksData from './parking.json';

const GoogleMapExample = withGoogleMap(
  ({ direction, parkInfo, onClickMarker }) => (
    <div>
      <GoogleMap
        defaultCenter={{ lat: 21.0294498, lng: 105.8544441 }}
        defaultZoom={13}
      >
        <DirectionsRenderer directions={direction} />
        {parksData.data.map((park) => (
          <Marker
            key={park.id}
            position={{
              lat: parseFloat(park.latitude),
              lng: parseFloat(park.longitude),
            }}
            onClick={() => onClickMarker(park)}
          />
        ))}
        {parkInfo && (
          <InfoWindow
            position={{
              lat: parseFloat(parkInfo.latitude),
              lng: parseFloat(parkInfo.longitude),
            }}
            onCloseClick={() => onClickMarker(null)}
          >
            <div>Park Details</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ),
);

const MapWrapper = () => {
  const [direction, setDirection] = useState(null);
  const [parkInfo, setParkInfo] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pointOrigin, setpointOrigin] = useState('');
  const [pointDestination, setPointDestination] = useState('');
  const [distance, setDistance] = useState(null);

  const onClickMarker = (park) => {
    setParkInfo(park);
  };

  const handleSelectOrigin = async (_origin) => {
    try {
      const results = await geocodeByAddress(_origin);
      const { lat, lng } = await getLatLng(results[0]);

      setOrigin({ lat, lng });
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleSelectDestination = async (_destination) => {
    try {
      const results = await geocodeByAddress(_destination);
      const { lat, lng } = await getLatLng(results[0]);

      setDestination({ lat, lng });
    } catch (error) {
      console.log('Error', error);
    }
  };

  const drawDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirection(result);
          setDistance(
            window.google.maps.geometry.spherical.computeDistanceBetween(
              origin,
              destination,
            ),
          );
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  };

  const onSearch = () => {
    drawDirections();
  };

  return (
    <div>
      <div className="position-absolute d-flex justify-content-center" style={{ zIndex: 1000, width: '100%' }}>
        <PlacesAutocomplete
          value={pointOrigin}
          onChange={setpointOrigin}
          onSelect={handleSelectOrigin}
          key="origin-point"
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="input-group">
              <input
                {...getInputProps({
                  placeholder: 'Search Origin ...',
                  className: 'form-control',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#42e3f5' : '#fff',
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <PlacesAutocomplete
          value={pointDestination}
          onChange={setPointDestination}
          onSelect={handleSelectDestination}
          key="destination-point"
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Destination',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#42e3f5' : '#fff',
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <button type="button" onClick={onSearch}>
          Search
        </button>
        <p>{`Distance: ${Math.round(distance) / 1000} km`}</p>
      </div>
      <div>
        <GoogleMapExample
          containerElement={
            <div style={{ height: '100vh', width: '100vw', float: 'right' }} />
          }
          mapElement={<div style={{ height: '100%' }} />}
          direction={direction}
          parkInfo={parkInfo}
          onClickMarker={onClickMarker}
        />
      </div>
    </div>
  );
};
export default MapWrapper;
