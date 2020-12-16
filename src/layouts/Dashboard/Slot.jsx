import React, {useEffect, useState} from 'react';
import ModalDetector from "../../components/Modal/ModalDetector";
import ModalEdit from "../../components/Modal/ModalEdit";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteDetectors, getDetectors} from "../../apis/detectorsApi";
import useModal from "../../helpers/useModal";
import {getSlotOfField} from "../../apis/slotApi";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {getField} from "../../apis/fieldApi";

function Slot(props) {
    const match = useLocation();
    const fieldId = match.pathname.split('/')[3];
    const dispatch = useDispatch();
    const listSlot = useSelector(state => state.slot.data);
    const field = useSelector(state => state.field.data);
    let fieldName;
    if (field) fieldName = field.filter(item => item.id === parseInt(fieldId))[0].position; else fieldName = '';
    const {isShowing, toggle} = useModal();
    const [typeModal, changeTypeModal] = useState(null);
    useEffect(() => {
        dispatch(getSlotOfField(fieldId));
        dispatch(getField());
    }, [dispatch, fieldId]);

    // Fix later-------------------------------
    function deleteDetector(id) {
        dispatch(deleteDetectors(id));
    }

    //Fix later----------------------------

    function handleTypeModal(type) {
        toggle();
        changeTypeModal(type);
    }

    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <h1 className="h3 mb-2 text-gray-800 text-capitalize">{`Field ${fieldName}`}</h1>
            <p className="mb-4">Update after 10 seconds.</p>

            {/*// <!-- DataTales Example -->*/}
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary">{`Database`}</h6>
                    <button className="btn-action p-2" onClick={() => handleTypeModal(-1)}><h6
                        className="m-0 font-weight-bold text-primary text-right"><i
                        className="fa fa-plus-square"/> Create</h6></button>
                    {isShowing && typeModal === -1 ? <ModalDetector isShowing={isShowing} hide={toggle}/> : null}
                </div>
                <div className="card-body">
                    <div className="table-responsive table-hover">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Slot ID</th>
                                <th>Address Detector</th>
                                <th>Address Gateway</th>
                                <th>Status</th>
                                <th>Last Update</th>
                                <th>Last Setup</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listSlot ? listSlot.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.addressDetector ? <Link to={`/dashboard/detector/${item.addressDetector}`}
                                                                      className="card-link">{item.addressDetector}
                                    </Link> : "No Address"}</td>
                                    <td>{item.addressGateway || "No Address"}</td>
                                    <td>
                                        <button className={`btn-status ${item.status ? 'btn-danger' : 'btn-success'}`}>
                                            {item.status ? 'Busy' : 'Free'}
                                        </button>
                                    </td>
                                    <td>{item.lastTimeUpdate || 'No Data'}</td>
                                    <td>{item.lastTimeSetup || 'No Data'}</td>
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
                                            </svg>
                                        </button>
                                    </td>
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

export default Slot;