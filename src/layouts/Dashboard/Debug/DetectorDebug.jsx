import React from 'react';
import {withRouter} from "react-router";
import ModalEdit from "../../../components/Modal/ModalEdit";
import {Spinner} from "react-bootstrap";

function DetectorDebug(props) {
    const listDetectors = [];
    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <h1 className="h3 mb-2 text-gray-800">Debug Detector</h1>
            <p className="mb-4">Checking Realtime. . . </p>

            {/*// <!-- DataTales Example -->*/}
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary">{`Database Detectors`}</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Detector ID</th>
                                <th>Address</th>
                                <th>Slot ID</th>
                                <th>Gateway ID</th>
                                <th>Last Update</th>
                                <th>Last Setup</th>
                                <th>Battery Level</th>
                                <th>LoraCom Level</th>
                                <th>Operating Mode</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listDetectors ? listDetectors.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.addressDetector}</td>
                                    <td>{item.slotId}</td>
                                    <td>{item.gatewayId}</td>
                                    <td>{item.lastTimeUpdate}</td>
                                    <td>{item.lastTimeSetup}</td>
                                    <td>{item.batteryLevel}</td>
                                    <td>{item.loracomLevel}</td>
                                    <td>{item.operatingMode}</td>
                                </tr>
                            )) : <tr>
                                <td><Spinner animation='border' color="primary"/></td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(DetectorDebug);