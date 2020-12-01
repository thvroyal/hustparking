import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {deleteDetectors, getDetectors} from "../../apis/detectorsApi";
import {Spinner} from "react-bootstrap";
import useModal from "../../helpers/useModal";
import ModalDetector from "../../components/Modal/ModalDetector";
import ModalEdit from "../../components/Modal/ModalEdit";

const Detectors = React.memo(function Table({id}) {
    const dispatch = useDispatch();
    const listDetectors = useSelector(state => state.detector.data);
    const deleteStatus = useSelector(state => state.detector.delete);
    const {isShowing, toggle} = useModal();
    const [typeModal, changeTypeModal] = useState(null);
    useEffect(() => {
        dispatch(getDetectors());
    }, [dispatch, deleteStatus]);


    function deleteDetector(id) {
        dispatch(deleteDetectors(id));
    }

    function handleTypeModal(type) {
        toggle();
        changeTypeModal(type);
    }

    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <h1 className="h3 mb-2 text-gray-800">Detectors</h1>
            <p className="mb-4">You can edit data below.</p>

            {/*// <!-- DataTales Example -->*/}
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary">{`Database Detectors`}</h6>
                    <button className="btn-action p-2" onClick={() => handleTypeModal(-1)}><h6
                        className="m-0 font-weight-bold text-primary text-right"><i
                        className="fa fa-plus-square"/> Create</h6></button>
                    {isShowing && typeModal === -1 ? <ModalDetector isShowing={isShowing} hide={toggle}/> : null}
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
                                <th>Action</th>
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
                                    <td className="text-gray-200">
                                        <button className="btn-action" onClick={() => handleTypeModal(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 viewBox="0 0 24 24" fill="none" stroke="#858796" strokeWidth="1.5"
                                                 strokeLinecap="round" strokeLinejoin="round"
                                                 className="feather feather-more-vertical">
                                                <circle cx="12" cy="12" r="1"/>
                                                <circle cx="12" cy="5" r="1"/>
                                                <circle cx="12" cy="19" r="1"/>
                                            </svg>
                                        </button>
                                        {isShowing && typeModal === index ?
                                            <ModalEdit isShowing={isShowing} hide={toggle} item={item}/> : null}
                                        <button className="btn-action" onClick={() => deleteDetector(item.id)}>
                                            {deleteStatus === item.id ?
                                                <Spinner animation='border' size='sm' style={{
                                                    color: '#e74a3b'
                                                }}/> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     viewBox="0 0 24 24"
                                                     fill="none" stroke="#e74a3b" strokeWidth="1.5"
                                                     strokeLinecap="round"
                                                     strokeLinejoin="round" className="feather feather-trash-2">
                                                    <polyline points="3 6 5 6 21 6"/>
                                                    <path
                                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                                </svg>}
                                        </button>
                                    </td>
                                </tr>
                            )): <tr><td><Spinner animation='border' color="primary"/></td></tr> }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
})

export default withRouter(Detectors);