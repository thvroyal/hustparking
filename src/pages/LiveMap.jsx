import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getField } from '../apis/fieldApi';
import MapWrapped from '../components/MapWrapped';
import ModalTableMap from '../components/Modal/ModalTableMap';

function LiveMap() {
  console.log('update!');
  const listFields = useSelector((state) => state.field.data);
  const [showTable, setShowTable] = useState(false);
  const [toggle, handleToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getField());
  }, [dispatch]);
  // const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`;
  return (
    <div className="position-relative" style={{ height: '100vh', width: '100%' }}>
      <header
        className="bg-primary text-white"
        style={{ height: '5%' }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <i
                className="fas fa-map"
                onClick={() => handleToggle(!toggle)}
                aria-label="button"
                role="button"
                tabIndex={0}
                onKeyDown={() => handleToggle(false)}
              />
            </div>
            <div className="text-end">
              <button
                type="button"
                className="btn me-2 btn-outline-primary"
                style={{
                  padding: '3px 6px',
                  transform: 'translate(0px, 4px)',
                }}
              >
                <Link to="/home" className="text-white">
                  Booking
                </Link>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div
        className="w-100"
        style={{ height: '95%' }}
      >
        <MapWrapped
          listFields={listFields}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=geometry,places`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
      <button
        type="button"
        onClick={() => setShowTable(true)}
        className="btn btn-primary position-absolute"
        style={{
          bottom: '25px',
          right: '66px',
        }}
      >
        View Table
      </button>
      <button
        type="button"
        className="btn position-absolute"
        style={{
          backgroundColor: 'white',
          top: '50px',
          right: '66px',
          cursor: 'none',
        }}
      >
        {`${listFields ? listFields.listOfFields.length : ''} records`}
      </button>

      <ModalTableMap
        onClose={() => setShowTable(false)}
        open={showTable}
        listFields={listFields}
      />
    </div>
  );
}

export default LiveMap;
