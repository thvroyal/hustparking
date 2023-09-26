import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CardGateway from '../../components/CardGateway';
import { getGateway } from '../../apis/GatewayApi';

function Gateway() {
  const dispatch = useDispatch();
  const listGateway = useSelector((state) => state.gateway.data);

  useEffect(() => {
    dispatch(getGateway());
  }, [dispatch]);

  return (
    <>
      <h1 className="h3 mb-5 text-gray-800">Fields</h1>
      <div className="row">
        {listGateway ? listGateway.map((item) => (
          <div className="col-xl-2 col-md-6 mb-4" key={item.id}>
            <Link to={`/dashboard/gateway/${item.id}`} className="card-link">
              <CardGateway id={item.id} totalDetector={item.totalDetector} address={item.address} />
            </Link>
          </div>
        )) : <Spinner animation="border" color="primary" />}
      </div>
    </>
  );
}

export default withRouter(Gateway);
