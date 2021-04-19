import React, { useEffect } from "react";
import { withRouter } from "react-router";
import CardField from "../../components/CardField";
import { useDispatch, useSelector } from "react-redux";
import { getField } from "../../apis/fieldApi";
import { Spinner } from "react-bootstrap";
import { getGateway } from "../../apis/GatewayApi";

function Fields(props) {
  const dispatch = useDispatch();
  const listField = useSelector((state) => state.field.data);
  const listGW = useSelector((state) => state.gateway.data);

  function searchGW(id) {
    if (listGW) return listGW.filter((gateway) => gateway.fieldId === id);
    else return [];
  }

  useEffect(() => {
    dispatch(getField());
    dispatch(getGateway());
  }, [dispatch]);

  //10s Reload
  return (
    <>
      <h1 className="h3 mb-5 text-gray-800">Fields</h1>
      <div className="row">
        {listField ? (
          listField.map((item, index) => (
            <div className="col-xl-3 col-md-6 mb-4" key={index}>
              <CardField
                name={item.name}
                id={item.id}
                data={[
                  item.totalBook,
                  item.busySlot,
                  item.totalSlot - item.busySlot - item.totalBook,
                ]}
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
