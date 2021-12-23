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
import ModalSavePoint from './ModalSavePoint';

function GoogleMapMarkers({ direction, parksData }) {
  const [parkInfo, setParkInfo] = useState(null);
  const [isMarkerShow, setIsMarkerShow] = useState(false);
  const [positionMarkerWhenClick, setPositionMarkerWhenClick] = useState(null);
  const onMapClick = (e) => {
    const positionMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    if (positionMarker === positionMarkerWhenClick) {
      setPositionMarkerWhenClick(null);
      setIsMarkerShow(false);
    } else {
      setPositionMarkerWhenClick(positionMarker);
      setIsMarkerShow(true);
    }
  };
  const closeModalPoint = () => {
    setPositionMarkerWhenClick(null);
    setIsMarkerShow(false);
  };

  return (
    <div>
      <GoogleMap
        defaultCenter={{ lat: 21.0294498, lng: 105.8544441 }}
        defaultZoom={13}
        onClick={(e) => onMapClick(e)}
      >
        { isMarkerShow
        && (
          <Marker
            position={positionMarkerWhenClick}
            icon={
              {
                url: '/parkingslot.jpg',
                scaledSize: new window.google.maps.Size(30, 30),
              }
            }
          />
        )}
        <ModalSavePoint
          open={isMarkerShow}
          onClose={closeModalPoint}
          currentPoint={positionMarkerWhenClick}
        />
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
              scaledSize: new window.google.maps.Size(30, 30),
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

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted') {
            console.log(result.state);
            // If granted then you can directly call your function here
          } else if (result.state === 'prompt') {
            console.log(result.state);
          } else if (result.state === 'denied') {
            // If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      console.log('Loi me no roi!');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(`Position is : ${position.coords.latitude},${position.coords.longitude}`);
      setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
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
    let minDistance;
    let minPoint;
    // TODO: filter cac bai do trong ban kinh x (km)
    for (let i = 0; i < listFields.length; i += 1) {
      const { latitude, longitude } = listFields[i];
      const currentPoint = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      const calDistance = window.google.maps.geometry.spherical.computeDistanceBetween(
        origin,
        currentPoint,
      );
      if (minDistance === undefined) {
        minDistance = calDistance;
        minPoint = { ...currentPoint };
      } else if (calDistance < minDistance) {
        minDistance = calDistance;
        minPoint = { ...currentPoint };
      }
    }
    setDestination(minPoint);
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
