/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getFieldUser } from '../../apis/fieldApi';

function GoogleMapMarkers({ direction, parksData }) {
  const [parkInfo, setParkInfo] = useState(null);
  return (
    <div>
      <GoogleMap
        defaultCenter={{ lat: 21.0294498, lng: 105.8544441 }}
        defaultZoom={13}
      >
        <DirectionsRenderer directions={direction} />
        {parksData && parksData.map((park) => (
          <Marker
            key={park.id}
            position={{
              lat: parseFloat(park.latitude),
              lng: parseFloat(park.longitude),
            }}
            onClick={() => {
              setParkInfo(park);
            }}
            icon={{
              url: '/parkingslot.jpg',
              scaledSize: new window.google.maps.Size(45, 45),
            }}
          />
        ))}
        {parkInfo && (
          <InfoWindow
            position={{
              lat: parseFloat(parkInfo.latitude),
              lng: parseFloat(parkInfo.longitude),
            }}
            onCloseClick={() => setParkInfo(null)}
          >
            <div>
              <div>{parkInfo.name}</div>
              <div>{`Status: ${parkInfo.busySlot}/${parkInfo.totalSlot}`}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

const GoogleMapExample = withGoogleMap(GoogleMapMarkers);

const MapWrapper = () => {
  const dispatch = useDispatch();
  const [direction, setDirection] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pointOrigin, setPointOrigin] = useState('');
  const [pointDestination, setPointDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const listFields = useSelector((state) => state.field.data);

  useEffect(() => {
    dispatch(getFieldUser());
  }, [dispatch]);

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
          console.log(destination);
        }
      },
    );
  };
  const onFilter = () => {
    const directionsService = new window.google.maps.DirectionsService();
    let i = 0;
    let mindistance = 10000000000;
    let dis;
    let spot;
    const point1 = { lat: 21.0058954, lng: 105.8415656 };
    const point2 = { lat: 21.0046105, lng: 105.8444669 };
    const point3 = { lat: 20.96489, lng: 105.7893622 };
    const point4 = { lat: 21.0475963, lng: 105.8059548 };
    const point5 = { lat: 21.0125263, lng: 105.8455568 };
    const point6 = { lat: 21.0089182, lng: 105.8200985 };
    const point7 = { lat: 21.0369823, lng: 105.7752916 };
    const point8 = { lat: 21.042621, lng: 105.8209603 };
    const point9 = { lat: 105, lng: 21 };
    const allpoint = [point1, point2, point3, point4, point5, point6, point7, point8, point9];
    for (i = 0; i < allpoint.length; i += 1) {
      dis = window.google.maps.geometry.spherical.computeDistanceBetween(
        destination,
        allpoint[i],
      );
      if (dis < mindistance) {
        mindistance = dis;
        spot = i;
      }
    }
    const { lat, lng } = allpoint[spot];
    setDestination({ lat, lng });
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
          console.log(destination);
        }
      },
    );
  };
  const onSearch = () => {
    drawDirections();
  };
  return (
    <div>
      <div className="position-absolute d-flex flex-column justify-content-center m-2" style={{ zIndex: 1000, width: '30%' }}>
        <PlacesAutocomplete
          value={pointOrigin}
          onChange={setPointOrigin}
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
                  className: 'form-control rounded border border-3 border-light shadow-sm p-2 mb-3 mt-2 bg-white',
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
            <div className="input-group">
              <input
                {...getInputProps({
                  placeholder: 'Search Destination ...',
                  className: 'form-control location-search-input rounded border border-3 border-light shadow-sm p-2 mb-3 bg-white',
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
        <button className="btn btn-primary" type="button" style={{ width: '20%' }} onClick={onSearch}>
          Search
        </button>
        <button className="btn btn-primary" type="button" style={{ width: '20%' }} onClick={onFilter}>
          Filter
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
          parksData={listFields}
        />
      </div>
    </div>
  );
};
export default MapWrapper;
