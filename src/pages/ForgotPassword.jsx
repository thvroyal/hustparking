import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import ForgotPasswordForm from '../layouts/Auth/ForgotPasswordForm';
import ResetPasswordForm from '../layouts/Auth/ResetPasswordForm';

function ForgotPassword() {
  return (
    <div className="bg-gradient-primary" style={{ height: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Reset Password</h1>
                    {/* <div className="alert alert-danger" role="alert">
                      msg
                    </div> */}
                    <Switch>
                      <Route path="/forgot-password/" exact>
                        <ForgotPasswordForm />
                      </Route>
                      <Route path="/forgot-password/:mail" exact component={ResetPasswordForm} />
                    </Switch>
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

export default React.memo(withRouter(ForgotPassword));
