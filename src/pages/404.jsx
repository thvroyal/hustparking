import React from 'react';
import { useHistory } from 'react-router-dom';

export default function PageNotFound() {
  const history = useHistory();
  const handleBack = () => history.goBack();
  return (
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              The page you are looking for was not found or not restricted.
            </div>
            <button className="btn btn-primary" onClick={handleBack} type="button">
              &#10229; Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
