import React from 'react';
import PropTypes from 'prop-types';

function CardGateway(props) {
  const { id, totalDetector, address } = props;

  return (
    <div className="card border-left-primary shadow h-100 py-2 card-field">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            {/* <div className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}> */}
            {/*    {`UPDATED: 20/12/2020 6H:30`} */}
            {/* </div> */}
            <div
              className="h5 mb-0 text-gray-800 font-weight-bold text-uppercase"
            >
              {`GW ${id}`}

            </div>
            <div className="text-xs font-weight-bold text-primary mb-1">
              {`Address: ${address}`}
            </div>
          </div>
          <div className="col-auto text-gray 800 font-weight-bold text-lg">
            {totalDetector}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CardGateway);

CardGateway.propTypes = {
  id: PropTypes.number.isRequired,
  totalDetector: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};
