import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import CardField from '../../components/CardField';
import { getField, getFieldByDistrict } from '../../apis/fieldApi';
import { getGateway } from '../../apis/GatewayApi';
import { getArea } from '../../apis/areaApi';
import { getDistrict } from '../../apis/districtApi';
import { SET_AD } from '../../helpers/constants';
import ModalCreateField from '../../components/Modal/ModalField/ModalCreateField';
import ModalTableMap from '../../components/Modal/ModalTableMap';

function Fields() {
  const dispatch = useDispatch();
  const selectAreaRef = useRef();
  const selectDistrictRef = useRef();
  const listField = useSelector((state) => state.field.data);
  const listGW = useSelector((state) => state.gateway.data);
  const listArea = useSelector((state) => state.area.data);
  const listDistrict = useSelector((state) => state.district.data);
  const { role } = useSelector((state) => state.auth);
  const [showTable, setShowTable] = useState(false);
  const [isOpenCreateField, setOpenCreateField] = useState(false);
  const [listFilterArea, setListFilterArea] = useState([]);
  // const [changeViewList, setChangeViewList] = useState(false);
  // const [listFilterFields, setListFilterFields] = useState([]);
  const [valueOptionDistrict, setValueOptionDistrict] = useState(null);
  const [valueOptionArea, setValueOptionArea] = useState(0);
  console.log(valueOptionArea);
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

  const filterAreaByDistrict = () => {
    console.log(valueOptionDistrict);
    const listFilter = listArea.filter(
      (item) => item.idDistrict === valueOptionDistrict,
    );
    console.log(listFilter);
    setListFilterArea([...listFilter]);
  };

  const getListFieldsByDistrict = (idDistrict) => {
    if (valueOptionDistrict === 'all') {
      dispatch(getField());
    } else {
      dispatch(getFieldByDistrict(idDistrict));
    }
  };

  // const filterArea = () => {
  //   let listFilter;
  //   if (valueOption === 'all') {
  //     setChangeViewList(false);
  //   }
  //   if (valueOption !== 'all') {
  //     listFilter = listField.listOfFields.filter(
  //       (item) => item.name === valueOption,
  //     );
  //     setChangeViewList(true);
  //     setListFilterFields([...listFilter]);
  //   }
  // };

  const onChangeValueDistrict = () => {
    console.log(selectDistrictRef.current.value);
    setValueOptionDistrict(parseInt(selectDistrictRef.current.value, 10) + 1);
    console.log(valueOptionDistrict);
    filterAreaByDistrict(valueOptionDistrict);
  };

  const onChangeValueArea = () => {
    setValueOptionArea(selectAreaRef.current.value);
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
        {role === SET_AD ? (
          <div className="input-group user mb-5 w-50">
            <select className="custom-select" id="fieldList" ref={selectDistrictRef} onChange={onChangeValueDistrict}>
              <option value="all" defaultChecked>What district do you want to view?</option>
              {listDistrict && listDistrict.map((district) => (
                <option value={district.id} key={district.id}>{district.district}</option>
              ))}
            </select>
            <select className="custom-select" id="fieldList" ref={selectAreaRef} onChange={onChangeValueArea}>
              <option value="all" defaultChecked>What area do you want to view?</option>
              {listFilterArea && listFilterArea.map((area) => (
                <option value={area.id} key={area.id}>{area.areaName}</option>
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
        ) : ''}
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
