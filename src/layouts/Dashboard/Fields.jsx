import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import CardField from '../../components/CardField';
import { getField } from '../../apis/fieldApi';
import { getGateway } from '../../apis/GatewayApi';

function Fields() {
  const dispatch = useDispatch();
  const listField = useSelector((state) => state.field.data);
  const listGW = useSelector((state) => state.gateway.data);

  function searchGW(id) {
    if (listGW) return listGW.filter((gateway) => gateway.fieldId === id);
    return [];
  }

  useEffect(() => {
    dispatch(getField());
    dispatch(getGateway());
  }, [dispatch]);

  // 10s Reload
  return (
    <>
      <h1 className="h3 mb-5 text-gray-800">Fields</h1>
      <div className="row">
        {listField ? (
          listField.map((item) => (
            <div className="col-xl-3 col-md-6 mb-4" key={item.id}>
              <CardField
                name={item.name}
                id={item.id}
                data={[item.totalBook, item.busySlot, item.totalSlot]}
                GW={searchGW(item.id)}
              />
            </div>
          ))
        ) : (
          <Spinner animation="border" color="primary" />
        )}
      </div>
    </>
  );
}

export default React.memo(withRouter(Fields));
