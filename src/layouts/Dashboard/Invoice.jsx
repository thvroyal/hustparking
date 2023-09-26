import React from 'react';
import { withRouter } from 'react-router';

function Invoice() {
  return (
    <>
      <div className="card invoice">
        <div className="card-header p-4 p-md-5 border-bottom-0 bg-gradient-primary-to-secondary text-white-50">
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-lg-auto mb-5 mb-lg-0 text-center text-lg-left">
              {/* // <!-- Invoice branding--> */}
              <div className="h2 text-white mb-0">Parking Prices</div>
              ID #29301
            </div>
            <div className="col-12 col-lg-auto text-center text-lg-right">
              {/* // <!-- Invoice details--> */}
              <div className="h3 text-white">Invoice</div>
              #29301
              <br />
              January 1, 2020
            </div>
          </div>
        </div>
        <div className="card-body p-4 p-md-5">
          {/* // <!-- Invoice table--> */}
          <div
            className="table-responsive"
            style={{
              overflowX: 'unset',
            }}
          >
            <table className="table table-borderless mb-0">
              <thead className="border-bottom">
                <tr className="small text-uppercase text-muted">
                  <th scope="col">Description</th>
                  <th className="text-right" scope="col">Hours</th>
                  <th className="text-right" scope="col">Rate</th>
                  <th className="text-right" scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* // <!-- Invoice item 1--> */}
                <tr className="border-bottom">
                  <td>
                    <div className="font-weight-bold">SB Admin Pro</div>
                    <div className="small text-muted d-none d-md-block">
                      A professional UI toolkit for
                      designing admin dashboards and web applications
                    </div>
                  </td>
                  <td className="text-right font-weight-bold">12</td>
                  <td className="text-right font-weight-bold">$50.00</td>
                  <td className="text-right font-weight-bold">$600.00</td>
                </tr>
                {/* // <!-- Invoice item 2--> */}
                <tr className="border-bottom">
                  <td>
                    <div className="font-weight-bold">SB UI Kit Pro</div>
                    <div className="small text-muted d-none d-md-block">
                      A UI toolkit for creating
                      marketing websites and landing pages
                    </div>
                  </td>
                  <td className="text-right font-weight-bold">15</td>
                  <td className="text-right font-weight-bold">$55.00</td>
                  <td className="text-right font-weight-bold">$825.00</td>
                </tr>
                {/* // <!-- Invoice item 3--> */}
                <tr className="border-bottom">
                  <td>
                    <div className="font-weight-bold">Pro HTML Bundle</div>
                    <div className="small text-muted d-none d-md-block">
                      A fully coded set of UI
                      resources for creating a comprehensive web application
                    </div>
                  </td>
                  <td className="text-right font-weight-bold">4</td>
                  <td className="text-right font-weight-bold">$125.00</td>
                  <td className="text-right font-weight-bold">$500.00</td>
                </tr>
                {/* // <!-- Invoice subtotal--> */}
                <tr>
                  <td className="text-right pb-0" colSpan="3">
                    <div className="text-uppercase small font-weight-bold text-muted">Subtotal:</div>
                  </td>
                  <td className="text-right pb-0">
                    <div className="h5 mb-0 font-weight-bold">$,1925.00</div>
                  </td>
                </tr>
                {/* // <!-- Invoice tax column--> */}
                <tr>
                  <td className="text-right pb-0" colSpan="3">
                    <div className="text-uppercase small font-weight-bold text-muted">Tax (7%):</div>
                  </td>
                  <td className="text-right pb-0">
                    <div className="h5 mb-0 font-weight-bold">$134.75</div>
                  </td>
                </tr>
                {/* // <!-- Invoice total--> */}
                <tr>
                  <td className="text-right pb-0" colSpan="3">
                    <div className="text-uppercase small font-weight-bold text-muted">
                      Total Amount Due:
                    </div>
                  </td>
                  <td className="text-right pb-0">
                    <div className="h5 mb-0 font-weight-bold text-primary">$2059.75</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(withRouter(Invoice));
