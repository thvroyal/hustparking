import React, {useEffect} from "react";
import {useLocation, withRouter} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {getDetectors} from "../../apis/detectorsApi";
import {Link} from "react-router-dom";

const Detectors = React.memo(function Table() {
    const match = useLocation();
    const idGW = match.pathname.split('/')[3];
    const dispatch = useDispatch();
    const listDetectors = useSelector(state => state.detector.data);

    useEffect(() => {
        dispatch(getDetectors(idGW));
    }, [dispatch, idGW]);
    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <h1 className="h3 mb-2 text-gray-800">Detectors</h1>
            <p className="mb-4">{`Gateway #${idGW}`}</p>

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
                            </tr>
                            </thead>
                            <tbody>
                            {listDetectors ? listDetectors.map((item, index) =>
                                (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <Link className="card-link"
                                                  to={`/dashboard/detector/${item.addressDetector}`}>
                                                {item.addressDetector}
                                            </Link>
                                        </td>
                                        <td>{item.slotId}</td>
                                        <td>{item.gatewayId}</td>
                                        <td>{item.lastTimeUpdate}</td>
                                        <td>{item.lastTimeSetup}</td>
                                        <td>{item.batteryLevel}</td>
                                        <td>{item.loracomLevel}</td>
                                    </tr>
                                )
                            ) : <tr>
                                <td><Spinner animation='border' color="primary"/></td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
})

export default withRouter(Detectors);