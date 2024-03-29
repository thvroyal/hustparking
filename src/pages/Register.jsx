import React from 'react';
import { withRouter } from 'react-router';
import RegisterForm from '../layouts/Auth/RegisterForm';

function Register() {
  return (
    <div className="bg-gradient-primary" style={{ height: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-register-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          Create An Account
                        </h1>
                        {/* <div className="alert alert-danger" role="alert">
                msg
              </div> */}
                        <RegisterForm />
                      </div>
                    </div>
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

export default React.memo(withRouter(Register));
