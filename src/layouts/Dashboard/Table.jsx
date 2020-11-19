import React from "react";
import {withRouter} from "react-router";

const Table = React.memo(function Table(props) {
    const listDetectors = [1, 2, 3, 4, 5, 8, 6, 7, 10, 11, 12, 13, 15, 20];
    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <h1 className="h3 mb-2 text-gray-800">Detectors</h1>
            <p className="mb-4">You can edit data below.</p>

            {/*// <!-- DataTales Example -->*/}
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary">Database Detectors</h6>
                    <button className="btn-action p-2"><h6 className="m-0 font-weight-bold text-primary text-right"><i
                        className="fa fa-plus-square"/> Create</h6></button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Detector ID</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Last Update</th>
                                <th>Battery Level</th>
                                <th>Lora Level</th>
                                <th>Mode</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listDetectors.map((item, index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>222.222.2.2</td>
                                    <td>
                                        <button
                                            className={`btn-status ${item % 2 === 0 ? 'btn-danger' : 'btn-success'}`}>{item % 2 === 0 ? 'Busy' : 'Free'}
                                        </button>
                                    </td>
                                    <td>19/11/2020</td>
                                    <td>60%</td>
                                    <td>70</td>
                                    <td>#NULL</td>
                                    <td className="text-gray-200">
                                        <button className="btn-action mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 viewBox="0 0 24 24" fill="none" stroke="#858796" strokeWidth="1.5"
                                                 strokeLinecap="round" strokeLinejoin="round"
                                                 className="feather feather-more-vertical">
                                                <circle cx="12" cy="12" r="1"/>
                                                <circle cx="12" cy="5" r="1"/>
                                                <circle cx="12" cy="19" r="1"/>
                                            </svg>
                                        </button>
                                        <button className="btn-action">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 viewBox="0 0 24 24"
                                                 fill="none" stroke="#e74a3b" strokeWidth="1.5" strokeLinecap="round"
                                                 strokeLinejoin="round" className="feather feather-trash-2">
                                                <polyline points="3 6 5 6 21 6"/>
                                                <path
                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                <line x1="10" y1="11" x2="10" y2="17"/>
                                                <line x1="14" y1="11" x2="14" y2="17"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
})

export default withRouter(Table);