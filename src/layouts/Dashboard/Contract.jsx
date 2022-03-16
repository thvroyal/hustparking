import React, { useEffect } from 'react';

import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router';
<<<<<<< Updated upstream
import { getContract } from '../../apis/contractApi';
=======
import { getContract, getQuantityContract } from '../../apis/contractApi';
import { LIST_FILTER } from '../../helpers/constants';
import CarBannerImg from '../../assets/img/2D_thư_viện_D35.drawio.png';
>>>>>>> Stashed changes

function Contract() {
  const dispatch = useDispatch();
  const { idUser } = useParams();
  const contractList = useSelector((state) => state.contract.data);

  useEffect(
    () => {
      dispatch(getContract(idUser));
    },
    [dispatch, idUser],
  );
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800 mb-4">Contracts</h1>

      <div className="card mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            {idUser === 'all' ? 'All Contracts' : `Contracts of User ${idUser}`}
          </h6>
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
                  <th scope="col">Image Car In</th>
                  <th scope="col">Time Car In</th>
                  <th scope="col">Image Car Out</th>
                  <th scope="col">Time Car Out</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {contractList ? (
                  contractList.map((ctr) => (
                    <tr key={ctr.id}>
                      <td>{ctr.id}</td>
                      <td>{ctr.userId}</td>
                      <td>{ctr.fieldId}</td>
                      <td>{ctr.carNumber}</td>
                      <td>{ctr.timeInBook}</td>
                      <td>{ctr.timeOutBook}</td>
                      <td>
                        {ctr.status === 'Booking' ? ''
                          : (
                            <img
                              className="image"
                              style={{
                                width: '100px',
                                height: '50px',
                                cursor: 'pointer',
                              }}
                              src={CarBannerImg}
                              alt=""
                            />
                          )}
                      </td>
                      <td>{ctr.timeCarIn}</td>
                      <td>
                        {ctr.status === 'Parking' || ctr.status === 'Booking' ? ''
                          : (
                            <img
                              className="image"
                              style={{
                                width: '100px',
                                height: '50px',
                                cursor: 'pointer',
                              }}
                              src={CarBannerImg}
                              alt=""
                            />
                          )}
                      </td>
                      <td>{ctr.timeCarOut}</td>
                      <td>
                        <span
                          className={`badge ${
                            ctr.status === 'Booking'
                              ? 'badge-warning'
                              : ctr.status === 'Parking'
                                ? 'badge-success'
                                : 'badge-secondary'
                          }`}
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
