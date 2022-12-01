import React from 'react';
import { withRouter } from 'react-router';
import LoginForm from '../layouts/Auth/LoginForm';

function Login() {
  return (
    <div className="bg-gradient" style={{ height: '100vh' }}>
      <div className="container h-100" style={{ padding: '0px 135px !important' }}>
        <div className="row justify-content-center" style={{ transform: 'translateY(28%)' }}>
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        {/* <div className="alert alert-danger" role="alert">
                msg
              </div> */}
                        <LoginForm />
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

export default React.memo(withRouter(Login));
