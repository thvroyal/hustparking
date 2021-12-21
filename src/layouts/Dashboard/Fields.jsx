import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import CardField from '../../components/CardField';
import { getField } from '../../apis/fieldApi';
import { getGateway } from '../../apis/GatewayApi';
import { SET_AD } from '../../helpers/constants';
import ModalCreateField from '../../components/Modal/ModalCreateField';

function Fields() {
  const dispatch = useDispatch();
  const listField = useSelector((state) => state.field.data);
  const listGW = useSelector((state) => state.gateway.data);
  const { role } = useSelector((state) => state.auth);
  const [isOpenCreateField, setOpenCreateField] = useState(false);

  function searchGW(id) {
    if (listGW) return listGW.filter((gateway) => gateway.fieldId === id);
    return [];
  }

  useEffect(() => {
    dispatch(getField());
    dispatch(getGateway());
  }, [dispatch]);

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
      <h1 className="h3 mb-5 text-gray-800">Fields</h1>
      <div className="row">
        {listField ? (
          <>
            {listField.map((item) => (
              <div className="col-xl-3 col-md-6 mb-4" key={item.id}>
                <CardField
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
