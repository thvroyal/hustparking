import React, { useEffect } from 'react';

import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListContract } from '../../apis/contractUserApi';
import { getFieldUser } from '../../apis/fieldApi';
import CollapseContract from '../../layouts/User/Contracts/CollapseContract';

function Contracts() {
  const dispatch = useDispatch();
  const loadingContract = useSelector((state) => state.listContract.loading);
  const { listContract } = useSelector((state) => state.listContract);
  const listField = useSelector((state) => state.field.data);
  const loadingField = useSelector((state) => state.field.loading);
  useEffect(() => {
    dispatch(getListContract());
    dispatch(getFieldUser());
  }, [dispatch]);
  return (
    <div>
      {!loadingContract && !loadingField ? (
        <div>
          <h1 className="mb-4">List Contracts</h1>

          <p className="m-0 text-primary">BOOKING</p>
          <hr className="mt-1" />
          {listContract && listField
            ? listContract.map((contract) => {
              if (contract.status === 'V') {
                return (
                  <CollapseContract
                    contract={contract}
                    field={listField.filter((f) => f.id === contract.fieldId)}
                    type="booking"
                    key={contract.id}
                  />
                );
              }
              return null;
            })
            : null}
          <p className="m-0 mt-4 text-primary">PARKING NOW</p>
          <hr className="mt-1" />
          {listContract && listField
            ? listContract.map((contract) => {
              if (contract.status === 'Y') {
                return (
                  <CollapseContract
                    contract={contract}
                    field={listField.filter((f) => f.id === contract.fieldId)}
                    type="parking"
                    key={contract.id}
                  />
                );
              }
              return null;
            })
            : null}
          <p className="m-0 mt-4 text-primary">HISTORY</p>
          <hr className="mt-1" />
          {listContract && listField
            ? listContract.map((contract) => {
              if (contract.status === 'R') {
                return (
                  <CollapseContract
                    contract={contract}
                    field={listField.filter((f) => f.id === contract.fieldId)}
                    type="leaved"
                    key={contract.id}
                  />
                );
              }
              return null;
            })
            : null}
        </div>
      ) : (
        <Spinner animation="border" color="primary" />
      )}
    </div>
  );
}

export default React.memo(Contracts);
