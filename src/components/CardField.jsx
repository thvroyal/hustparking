import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap';
import ModalDeleteField from './Modal/ModalField/ModalDeleteField';
import ModalCreateGW from './Modal/ModalGW/ModalCreateGW';
import ModalOption from './Modal/ModalGW/ModalOption';

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
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [isOpenModalCreateGW, setOpenModalCreateGW] = useState(false);
  const [isOpenModalOption, setOpenModalOption] = useState(false);
  const [idGW, setIdGW] = useState(0);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className="card border-left-primary shadow h-100 py-2 card-field">
      <button
        type="button"
        className="btn btn-danger"
        style={{ width: '10%', transform: 'translateX(825%)' }}
        onClick={() => setOpenModalDelete(true)}
      >
        <i className="fas fa-times" style={{ fontSize: '10px' }} />
      </button>
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
                <div
                  className="badge badge-primary font-weight-normal mr-1"
                  id={`tooltip${index}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.ctrlKey) {
                      setOpenModalCreateGW(true);
                    }
                  }}
                  onClick={() => {
                    setIdGW(item.id);
                    setOpenModalOption(true);
                  }}
                >
                  {`GW${item.id}`}

                </div>
              ))
              : (
                <>
                  <div>
                    <div
                      className="badge badge-primary font-weight-normal mr-1"
                      id="tooltip-create-GW"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.ctrlKey) {
                          setOpenModalCreateGW(true);
                        }
                      }}
                      onClick={() => setOpenModalCreateGW(true)}
                    >
                      <i className="fas fa-plus" />

                    </div>
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
      <ModalOption
        onClose={() => setOpenModalOption(false)}
        open={isOpenModalOption}
        idGW={idGW}
      />
      <ModalCreateGW
        onClose={() => setOpenModalCreateGW(false)}
        open={isOpenModalCreateGW}
        id={id}
      />
      <ModalDeleteField
        onClose={() => setOpenModalDelete(false)}
        open={isOpenModalDelete}
        id={id}
      />
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
