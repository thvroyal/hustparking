import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, Card, Table, Spinner,
} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getListContract } from '../../../apis/contractUserApi';
import { getFieldUser } from '../../../apis/fieldApi';

function CollapseContract(props) {
  const { type, contract, field } = props;
  const dispatch = useDispatch();
  const [loadingCancel, setloadingCancel] = useState(false);
  const [loadingCarIn, setloadingCarIn] = useState(false);
  const [loadingCarOut, setloadingCarOut] = useState(false);
  function formatString(str) {
    if (str) return str.split('+')[0].split('T').join(' ').split('.')[0];
    return 'N/A';
  }
  async function cancelBooking() {
    const data = { ...contract, status: 'C' };
    setloadingCancel(true);
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/us/update_contract`,
        headers: {
          token: localStorage.AccessToken,
        },
        data,
      });
      setloadingCancel(false);
      if (response.data.message === 'success') {
        dispatch(getListContract());
        dispatch(getFieldUser());
      }
    } catch (error) {
      setloadingCancel(false);
      console.error(error);
    }
  }
  function limitString(str, limit) {
    if (str.length > limit) return `${str.slice(0, limit)}...`; return str;
  }
  function convertNum(d) {
    if (parseInt(d, 10) < 10) return `0${parseInt(d, 10)}`;
    return d;
  }
  function formatDateNow() {
    const timeNow = new Date();
    const timeNowArray = timeNow.toLocaleString('vi-VN').split(', ');
    const date = timeNowArray[1].split('/');
    const time = timeNowArray[0].split(':');
    const dateFormatted = `${date[2]}-${convertNum(date[1])}-${convertNum(date[0])} ${convertNum(time[0])}:${convertNum(time[1])}:00`;
    return dateFormatted;
  }
  async function updateTime(t) {
    const data = {
      contractId: contract.id,
      timeCarIn: t === 'in' ? formatDateNow() : '',
      timeCarOut: t === 'out' ? formatDateNow() : '',
    };
    if (t === 'in') setloadingCarIn(true); else setloadingCarOut(true);
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/us/update_time`,
        headers: {
          token: localStorage.AccessToken,
        },
        data,
      });
      if (t === 'in') setloadingCarIn(true); else setloadingCarOut(false);

      if (response.data.message === 'success') {
        dispatch(getListContract());
        dispatch(getFieldUser());
      }
    } catch (error) {
      if (t === 'in') setloadingCarIn(true); else setloadingCarOut(false);
      console.error(error);
    }
  }
  return (
    <Accordion className="mb-2">
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey="0"
          className={`${type} cursor booking-card`}
        >
          <div className=" d-flex justify-content-between align-items-center">
            <div>
              <div className="font-weight-bold h3 mb-0">{limitString(field[0].name, 25)}</div>
              <div className="small text-uppercase">{limitString(field[0].address, 47)}</div>
            </div>
            <div>
              <div className="text-uppercase small">Car number</div>
              <div className="font-weight-bold h3 mb-0">
                {contract.carNumber}
              </div>
            </div>
            {/* Show booking time */}
            {type === 'booking' && (
              <>
                <div>
                  <div className="text-uppercase small">Book in time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeInBook)}
                  </div>
                </div>
                <div>
                  <div className="text-uppercase small">Book out time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeOutBook)}
                  </div>
                </div>
              </>
            )}
            {/* Show parking time */}
            {type === 'parking' && (
              <>
                <div>
                  <div className="text-uppercase small">Car in time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeCarIn)}
                  </div>
                </div>
                <div>
                  <div className="text-uppercase small">Book out time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeOutBook)}
                  </div>
                </div>
              </>
            )}
            {/* Show leaved time */}
            {type === 'leaved' && (
              <>
                <div>
                  <div className="text-uppercase small">Car in time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeCarIn)}
                  </div>
                </div>
                <div>
                  <div className="text-uppercase small">Car out time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeCarOut)}
                  </div>
                </div>
              </>
            )}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className="d-flex justify-content-around">
              <div style={{ width: '50%' }} className="table-contract">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>ID Contract</td>
                      <td>{contract.id}</td>
                    </tr>
                    <tr>
                      <td>Field Name </td>
                      <td>{field[0].name}</td>
                    </tr>
                    <tr>
                      <td>Field Address </td>
                      <td>{field[0].address}</td>
                    </tr>
                    <tr>
                      <td>Car Number</td>
                      <td>{contract.carNumber}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>
                        <button
                          className={`btn-status ${
                            contract.status === 'V'
                              ? 'btn-warning'
                              : contract.status === 'Y'
                                ? 'btn-success'
                                : 'btn-danger'
                          }`}
                          disabled
                          type="button"
                        >
                          {contract.status === 'V'
                            ? 'Booking'
                            : contract.status === 'Y'
                              ? 'Parking'
                              : 'Leaved'}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Time In Book </td>
                      <td>{formatString(contract.timeInBook)}</td>
                    </tr>
                    <tr>
                      <td>Time Out Book </td>
                      <td>{formatString(contract.timeOutBook)}</td>
                    </tr>
                    <tr>
                      <td>Time Car In </td>
                      <td>{formatString(contract.timeCarIn)}</td>
                    </tr>
                    <tr>
                      <td>Time Car Out </td>
                      <td>{formatString(contract.timeCarOut)}</td>
                    </tr>
                    <tr>
                      <td>Cost</td>
                      <td>
                        {parseFloat(contract.cost).toFixed(2)}
                        <sup> đ</sup>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div>
                <button
                  className="btn btn-danger px-4 mt-3"
                  disabled={contract.timeCarIn}
                  type="button"
                  onClick={cancelBooking}
                >
                  {loadingCancel && (
                  <Spinner
                    animation="border"
                    color="primary"
                    size="sm"
                    className="mr-2"
                  />
                  )}
                  {!loadingCancel && <i className="fas fa-ban mr-2" />}
                  Cancel Booking
                </button>
                <hr />
                <button
                  className="btn btn-outline-success px-4 mr-3"
                  disabled={contract.timeCarIn}
                  type="button"
                  onClick={() => updateTime('in')}
                >
                  {loadingCarIn && (
                  <Spinner
                    animation="border"
                    color="primary"
                    size="sm"
                    className="mr-2"
                  />
                  )}
                  {!loadingCarIn && <i className="fas fa-sign-in-alt mr-2" />}
                  Car In
                </button>
                <button
                  className="btn btn-outline-danger px-4"
                  disabled={contract.timeCarOut}
                  type="button"
                  onClick={() => updateTime('out')}
                >
                  {loadingCarOut && (
                  <Spinner
                    animation="border"
                    color="primary"
                    size="sm"
                    className="mr-2"
                  />
                  )}
                  {!loadingCarOut && <i className="fas fa-sign-out-alt mr-2" />}
                  Car Out
                </button>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default CollapseContract;

CollapseContract.propTypes = {
  type: PropTypes.oneOf(['booking', 'parking', 'leaved']).isRequired,
  contract: PropTypes.shape({
    carNumber: PropTypes.string,
    cost: PropTypes.string,
    dtCreate: PropTypes.string,
    fieldId: PropTypes.number,
    id: PropTypes.number,
    status: PropTypes.string,
    timeCarIn: PropTypes.string,
    timeCarOut: PropTypes.string,
    timeInBook: PropTypes.string,
    timeOutBook: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
  field: PropTypes.arrayOf(PropTypes.object).isRequired,
};
