import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

function Contract(props) {
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800 mb-4">Contracts</h1>

            <div className="card mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">History Contracts</h6>
                </div>
                <div className="card-body p-0">
                    {/*// <!-- Billing history table-->*/}
                    <div className="table-responsive table-billing-history table-hover">
                        <table className="table mb-0">
                            <thead>
                            <tr>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><Link to={`/dashboard/contract/39201`} className="card-link">#39201</Link></td>
                                <td>06/15/2020</td>
                                <td>$29.99</td>
                                <td><span className="badge badge-light">Pending</span></td>
                            </tr>
                            <tr>
                                <td>#38594</td>
                                <td>05/15/2020</td>
                                <td>$29.99</td>
                                <td><span className="badge badge-success">Paid</span></td>
                            </tr>
                            <tr>
                                <td>#38223</td>
                                <td>04/15/2020</td>
                                <td>$29.99</td>
                                <td><span className="badge badge-success">Paid</span></td>
                            </tr>
                            <tr>
                                <td>#38125</td>
                                <td>03/15/2020</td>
                                <td>$29.99</td>
                                <td><span className="badge badge-success">Paid</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(withRouter(Contract));