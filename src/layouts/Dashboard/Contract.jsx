import React, { useEffect, useState } from 'react';

import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router';
import { getContract } from '../../apis/contractApi';
import { LIST_FILTER } from '../../helpers/constants';

function Contract() {
  const dispatch = useDispatch();
  const { idUser } = useParams();
  const contractList = useSelector((state) => state.contract.data);
  const [contractFilter, setContract] = useState([]);
  const hanldeContract = (num = 20) => {
    if (contractList) {
      const contract = contractList.slice(contractList.length - num, contractList.length);
      setContract(contract);
    }
  };
  // useEffect(() => hanldeContract());
  useEffect(
    () => {
      dispatch(getContract(idUser));
      hanldeContract();
    },
    [dispatch, idUser],
  );

  // filter list contract
  const [toggleContract, setToggleContract] = useState(false);

  const handleFilterContractShow = () => {
    setToggleContract(!toggleContract);
  };
  const showAll = () => hanldeContract(contractList.length);

  return (
    <>
      <h1 className="h3 mb-2 text-gray-800 mb-4">Contracts</h1>

      <div className="card mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            {idUser === 'all' ? 'All Contracts' : `Contracts of User ${idUser}`}
          </h6>
          <div style={{ position: 'relative' }}>
            <span style={{ marginRight: '10px' }}>Filter</span>
            {' '}
            <i
              className="fas fa-filter text-primary"
              onClick={handleFilterContractShow}
              style={{ cursor: 'pointer' }}
              aria-hidden="true"
            />
          </div>
          <div className="dropdown text-end position-absolute">
            <ul
              className={`dropdown-menu text-small ${toggleContract ? 'show' : ''}`}
              aria-labelledby="dropdownUser1"
              style={
                toggleContract
                  ? {
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    margin: '0px',
                    transform: 'translate(1050px, 26px)',
                    overflow: 'auto',
                  }
                  : {}
              }
            >
              <li>
                <a
                  className="dropdown-item text-small text-end text-danger"
                  href="#foo"
                  onClick={showAll}
                >
                  Show all
                </a>
                <hr className="dropdown-divider" />
              </li>
              {LIST_FILTER
                ? LIST_FILTER.map((item) => (
                  <li key={item}>
                    <a
                      className="dropdown-item"
                      href="#foo"
                      onClick={() => {
                        hanldeContract(item);
                      }}
                    >
                      {item}
                    </a>
                    <hr className="dropdown-divider" />
                  </li>
                ))
                : null}
            </ul>
          </div>
        </div>
        <div className="card-body p-0">
          {/* // <!-- Billing history table--> */}
          <div className="table-responsive table-billing-history table-hover">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Field ID</th>
                  <th scope="col">Car Number</th>
                  <th scope="col">Booking In</th>
                  <th scope="col">Booking Out</th>
                  <th scope="col">Time Car In</th>
                  <th scope="col">Time Car Out</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {contractFilter ? (
                  contractFilter.map((ctr) => (
                    <tr key={ctr.id}>
                      <td>{ctr.id}</td>
                      <td>{ctr.userId}</td>
                      <td>{ctr.fieldId}</td>
                      <td>{ctr.carNumber}</td>
                      <td>{ctr.timeInBook}</td>
                      <td>{ctr.timeOutBook}</td>
                      <td>{ctr.timeCarIn}</td>
                      <td>{ctr.timeCarOut}</td>
                      <td>
                        <span
                          className={`badge ${ctr.status === 'Booking' ? 'badge-warning' : ctr.status === 'Parking'
                            ? 'badge-success'
                            : 'badge-secondary'}`}
                        >
                          {ctr.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <Spinner animation="border" color="primary" />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(withRouter(Contract));
