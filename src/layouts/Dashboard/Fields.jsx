import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import CardField from '../../components/CardField';
import { getField } from '../../apis/fieldApi';
import { getGateway } from '../../apis/GatewayApi';
import { SET_AD } from '../../helpers/constants';
import ModalCreateField from '../../components/Modal/ModalField/ModalCreateField';

function Fields() {
  const dispatch = useDispatch();
  const selectAreaRef = useRef();
  const listField = useSelector((state) => state.field.data);
  const listGW = useSelector((state) => state.gateway.data);
  const { role } = useSelector((state) => state.auth);
  const [isOpenCreateField, setOpenCreateField] = useState(false);
  const [changeViewList, setChangeViewList] = useState(false);
  const [listFilterFields, setListFilterFields] = useState([]);
  const [valueOption, setValueOption] = useState('');
  function searchGW(id) {
    if (listGW) return listGW.filter((gateway) => gateway.fieldId === id);
    return [];
  }

  useEffect(() => {
    dispatch(getField());
    dispatch(getGateway());
  }, [dispatch]);

  const filterArea = () => {
    let listFilter;
    if (valueOption === 'all') {
      setChangeViewList(false);
    }
    if (valueOption !== 'all') {
      listFilter = listField.filter(
        (item) => item.name === valueOption,
      );
      setChangeViewList(true);
      setListFilterFields([...listFilter]);
    }
  };

  const onChangeValue = () => {
    setValueOption(selectAreaRef.current.value);
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
        <h1 className="h3 mb-5 text-gray-800">Fields</h1>
        {role === SET_AD ? (
          <div className="input-group user mb-5 w-50">
            <select className="custom-select" id="fieldList" ref={selectAreaRef} onChange={onChangeValue}>
              <option value="all" defaultChecked>What district do you want to view?</option>
              {listField && listField.map((f) => (
                <option value={f.name} key={f.id}>{f.name}</option>
              ))}
            </select>
            <select className="custom-select" id="fieldList" ref={selectAreaRef} onChange={onChangeValue}>
              <option value="all" defaultChecked>What ward do you want to view?</option>
              {listField && listField.map((f) => (
                <option value={f.name} key={f.id}>{f.name}</option>
              ))}
            </select>
            <select className="custom-select" id="fieldList" ref={selectAreaRef} onChange={onChangeValue}>
              <option value="all" defaultChecked>What area do you want to view?</option>
              {listField && listField.map((f) => (
                <option value={f.name} key={f.id}>{f.name}</option>
              ))}
            </select>
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="button" onClick={() => filterArea()}>
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
            {(changeViewList ? listFilterFields : listField).map((item) => (
              <div className="col-xl-3 col-md-6 mb-4" key={item.id}>
                <CardField
                  area="Bách Khoa"
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
    </>
  );
}

export default React.memo(withRouter(Fields));
