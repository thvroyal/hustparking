import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap';

function CardField(props) {
  const {
    name, id, data, GW,
  } = props;
  const dataPie = {
    datasets: [
      {
        data: [data[0], data[1], data[2] - data[0] - data[1]],
        backgroundColor: ['#f6c23e', '#e74a3b', '#1cc88a'],
        borderWidth: 0,
      },
    ],
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className="card border-left-primary shadow h-100 py-2 card-field">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <Link to={`/dashboard/fields/${id}`} className="card-link">
              <div
                className="text-xs font-weight-bold text-primary text-uppercase mb-1"
              >
                {`Field ${id}`}
              </div>
              <div
                className="h5 mb-0 text-gray-800 font-weight-bold text-uppercase"
              >
                {name}
              </div>
            </Link>
            {(GW && GW.length)
              ? GW.map((item, index) => (
                <Link
                  to={`/dashboard/gateway/${item.id}`}
                  className="btn-link"
                  key={item.id}
                >
                  <div
                    className="badge badge-primary font-weight-normal mr-1"
                    id={`tooltip${index}`}
                  >
                    {`GW${item.id}`}

                  </div>
                  <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target={`tooltip${index}`}
                    toggle={toggle}
                  >
                    Click to show all detectors
                  </Tooltip>
                </Link>
              ))
              : (
                <>
                  <div
                    className="badge badge-primary font-weight-normal mr-1"
                    id="tooltip-create-GW"
                  >
                    <i className="fas fa-plus" />

                  </div>
                  <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target="tooltip-create-GW"
                    toggle={toggle}
                  >
                    Create new gateway
                  </Tooltip>
                </>
              )}
          </div>
          <div className="col-2">
            <div className="d-flex flex-column align-items-center">
              <Pie
                data={dataPie}
                options={{ tooltips: { enabled: false } }}
                width={58}
                height={58}
              />
              {data[2] ? <div className="badge badge-primary font-weight-normal mr-1 mt-2">{`${data[1]}/${data[2]}`}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CardField);

CardField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.number),
  GW: PropTypes.arrayOf(PropTypes.object).isRequired,
};
CardField.defaultProps = {
  data: [0, 0, 0],
};
