import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getPacket} from "../../../apis/packageApi";

function DetectorDebug(props) {
    const dispatch = useDispatch();
    const listDetectors = useSelector(state => state.packet.data);

    useEffect(() => {
        const interval = setInterval(getData, 5000);
        return () => clearInterval(interval);
    }, [dispatch]);

    function getData() {
        dispatch(getPacket());
    }
    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <h1 className="h3 mb-2 text-gray-800">Debug</h1>
            <p className="mb-4">Checking Realtime. . . </p>

            {/*// <!-- DataTales Example -->*/}
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary">{`Database Detectors`}</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive table-hover">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Seq. Number</th>
                                <th>Detector</th>
                                <th>Battery</th>
                                <th>Node Address</th>
                                <th>State</th>
                                <th>Communication Level</th>
                                <th>Time</th>
                                <th>Location</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listDetectors ? listDetectors.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.packetNumber}</td>
                                    <td>{item.addressDetector}</td>
                                    <td>{item.batteryLevel}</td>
                                    <td>{item.nodeAddress}</td>
                                    <td>
                                        <button className={`btn-status ${item.state ? 'btn-danger' : 'btn-success'}`}>
                                            {item.state ? 'Busy' : 'Free'}
                                        </button>
                                    </td>
                                    <td>{item.communicationLevel}</td>
                                    <td>{item.time}</td>
                                    <td>{item.location}</td>
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