import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, Table } from 'react-bootstrap';

function CollapseContract(props) {
  function formatString(str) {
    if (str) return str.split('+')[0].split('T').join(' ').split('.')[0];
    return 'N/A';
  }
  const { type, contract, field } = props;
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey="0"
          className={`${type} cursor booking-card`}
        >
          <div className=" d-flex justify-content-between align-items-center">
            <div>
              <div className="font-weight-bold h3 mb-0">{field[0].name}</div>
              <div className="small text-uppercase">{field[0].address}</div>
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
                      <td>{contract.cost}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div>
                <button
                  className="btn btn-primary px-4"
                  disabled={contract.timeCarIn}
                  type="button"
                >
                  <i className="fas fa-hourglass-start mr-2" />
                  Extend Booking
                </button>
                <br />

                <button
                  className="btn btn-danger px-4 mt-3"
                  disabled={contract.timeCarIn}
                  type="button"
                >
                  <i className="fas fa-ban mr-2" />
                  Cancel Booking
                </button>
                <hr />
                <button
                  className="btn btn-outline-success px-4 mr-3"
                  disabled={contract.timeCarIn}
                  type="button"
                >
                  <i className="fas fa-sign-in-alt mr-2" />
                  Car In
                </button>
                <button
                  className="btn btn-outline-danger px-4"
                  disabled={contract.timeCarOut}
                  type="button"
                >
                  <i className="fas fa-sign-out-alt mr-2" />
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
