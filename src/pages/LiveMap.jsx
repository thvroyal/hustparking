import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapWrapped from '../components/MapWrapped';
import { getField } from '../apis/fieldApi';
import ModalTableMap from '../components/Modal/ModalTableMap';
import HeaderLiveMaps from '../layouts/Header/HeaderLiveMaps';
import SidebarMaps from '../layouts/Sidebar/SidebarMaps';

function LiveMap() {
  console.log('update!');
  const listFields = useSelector((state) => state.field.data);
  const [showTable, setShowTable] = useState(false);
  // const [toggle, handleToggle] = useState(false);
  const dispatch = useDispatch();

  // function handleToggleButton() {
  //   handleToggle(!toggle);
  // }

  useEffect(() => {
    dispatch(getField());
  }, [dispatch]);
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`;
  return (
    <div className="position-relative" style={{ height: '100vh', width: '100vw' }}>
      <HeaderLiveMaps />
      <div
        className="w-100"
        style={{ height: '95%' }}
      >
        <MapWrapped
          listFields={listFields}
          googleMapURL={googleMapURL}
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
          left: '190px',
          cursor: 'none',
        }}
      >
        {`${listFields ? listFields.listOfFields.length : ''} records`}
      </button>

      <SidebarMaps />

      <ModalTableMap
        onClose={() => setShowTable(false)}
        open={showTable}
        listFields={listFields}
      />
    </div>
  );
}

export default LiveMap;
