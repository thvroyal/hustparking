import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { getArea } from '../../apis/areaApi';
import { getDistrict } from '../../apis/districtApi';
import { getField, getFieldByDistrict } from '../../apis/fieldApi';
import { getGateway } from '../../apis/GatewayApi';
import CardField from '../../components/CardField';
import ModalCreateField from '../../components/Modal/ModalField/ModalCreateField';
import ModalTableMap from '../../components/Modal/ModalTableMap';
import { SET_AD } from '../../helpers/constants';

function Fields() {
  const dispatch = useDispatch();
  const selectDistrictRef = useRef();
  const listField = useSelector((state) => state.field.data);
  const listGW = useSelector((state) => state.gateway.data);
  const listDistrict = useSelector((state) => state.district.data);
  const { role } = useSelector((state) => state.auth);
  const [showTable, setShowTable] = useState(false);
  const [isOpenCreateField, setOpenCreateField] = useState(false);
  const [valueOptionDistrict, setValueOptionDistrict] = useState(null);
  function searchGW(id) {
    if (listGW) return listGW.filter((gateway) => gateway.fieldId === id);
    return [];
  }

  useEffect(() => {
    dispatch(getField());
    dispatch(getGateway());
    dispatch(getArea());
    dispatch(getDistrict());
  }, [dispatch]);

  const getListFieldsByDistrict = (idDistrict) => {
    if (valueOptionDistrict === 'all') {
      dispatch(getField());
    } else {
      dispatch(getFieldByDistrict(idDistrict));
    }
  };

  const onChangeValueDistrict = () => {
    console.log(selectDistrictRef.current.value);
    setValueOptionDistrict(selectDistrictRef.current.value);
  };

  const drawCreateField = () => (
    <div
      className="col-xl-3 col-md-6 mb-4"
      key="create-new-field"
      onClick={() => setOpenCreateField(true)}
      aria-hidden="true"
      style={{ cursor: 'pointer' }}
    >
      <div className="card h-100 py-2 card-field card-border-dash">
        <div className="card-body d-flex align-items-center justify-content-center">
          <i className="fas fa-plus fa-3x" />
        </div>
      </div>
    </div>
  );
  // 10s Reload
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <button
          className="btn btn-outline-primary h1 mb-5"
          type="button"
          onClick={() => setShowTable(true)}
        >
          Fields
        </button>
        <div className="input-group user mb-5 w-50">
          <select className="custom-select" id="fieldList" ref={selectDistrictRef} onChange={onChangeValueDistrict}>
            <option value="all" defaultChecked>What district do you want to view?</option>
            {listDistrict && listDistrict.map((district) => (
              <option value={district.id} key={district.id}>{district.district}</option>
            ))}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="button" onClick={() => getListFieldsByDistrict(valueOptionDistrict)}>
              {' '}
              {/* {loading && (
              <Spinner
                animation="border"
                color="primary"
                size="sm"
                className="mr-3"
              />
            )} */}
              Check now

            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {listField ? (
          <>
            {listField.listOfFields.map((item) => (
              <div className="col-xl-3 col-md-6 mb-4" key={item.id}>
                <CardField
                  area={item.area.areaName}
                  name={item.name}
                  id={item.id}
                  data={[item.totalBook, item.busySlot, item.totalSlot]}
                  GW={searchGW(item.id)}
                />
              </div>
            ))}
            {role === SET_AD && drawCreateField()}
          </>
        ) : (
          <Spinner animation="border" color="primary" />
        )}
        <ModalCreateField onClose={() => setOpenCreateField(false)} open={isOpenCreateField} />
      </div>
      <ModalTableMap
        onClose={() => setShowTable(false)}
        open={showTable}
        listFields={listField}
      />
    </>
  );
}

export default React.memo(withRouter(Fields));
