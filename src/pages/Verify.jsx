import React from 'react';
import { withRouter } from 'react-router';
import VerifyForm from '../layouts/Auth/VerifyForm';

function Verify() {
  return (
    <div className="bg-gradient-primary" style={{ height: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Verify Account</h1>
                    {/* <div className="alert alert-danger" role="alert">
                      msg
                    </div> */}
                    <VerifyForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(withRouter(Verify));
