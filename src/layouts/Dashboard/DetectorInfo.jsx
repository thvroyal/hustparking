import React, {useEffect} from 'react';
import {useLocation, withRouter} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getDetectorById} from "../../apis/detectorByIdApi";

function DetectorInfo(props) {
    const dispatch = useDispatch();
    const match = useLocation();
    const detectorId = match.pathname.split('/')[3];
    const infoDetector = useSelector(state => state.detectorById.data);

    useEffect(() => {
        dispatch(getDetectorById(detectorId));
    }, [detectorId, dispatch])

    return (
        <div className="card mb-4 w-50">
            <div className="card-header text-primary text-lg">Detector Info</div>
            <div className="card-body">
                <form>
                    {/*// <!-- Form Group (username)-->*/}
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="detectorId">Detector ID</label>
                        <input className="form-control" id="detectorId" type="text"
                               value={infoDetector.id}/>
                    </div>
                    {/*// <!-- Form Row-->*/}
                    <div className="form-row">
                        {/*// <!-- Form Group (first name)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="addressDetector">Address Detector</label>
                            <input className="form-control" id="addressDetector" type="text"
                                   value={infoDetector['address_detector']}/>
                        </div>
                        {/*// <!-- Form Group (last name)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="addressGateway">Address Gateway</label>
                            <input className="form-control" id="addressGateway" type="text"
                                   value={infoDetector['gateway_id']}/>
                        </div>
                    </div>
                    {/*// <!-- Form Row        -->*/}
                    <div className="form-row">
                        {/*// <!-- Form Group (organization name)-->*/}
                        {/*<div className="form-group col-md-6">*/}
                        {/*    <label className="small mb-1" htmlFor="status">Status</label>*/}
                        {/*    <input className="form-control" id="status" type="text"*/}
                        {/*           value="Busy"/>*/}
                        {/*</div>*/}
                        {/*// <!-- Form Group (location)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="battery">Batery</label>
                            <input className="form-control" id="battery" type="text"
                                   value={infoDetector['battery_level']}/>
                        </div>
                    </div>
                    {/*// <!-- Form Group (email address)-->*/}
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="slotId">Slot Id</label>
                            <input className="form-control" id="slotId" type="email"
                                   value={infoDetector['slot_id']}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="communicationLevel">Communication Level</label>
                            <input className="form-control" id="communicationLevel" type="email"
                                   value={infoDetector['loracom_level']}/>
                        </div>
                    </div>
                    {/*// <!-- Form Row-->*/}
                    <div className="form-row">
                        {/*// <!-- Form Group (phone number)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="lastTimeUpdate">Last Update</label>
                            <input className="form-control" id="lastTimeUpdate" type="text"
                                   value={infoDetector['last_time_update']}/>
                        </div>
                        {/*// <!-- Form Group (birthday)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="lastTimeSetup">Last Setup</label>
                            <input className="form-control" id="lastTimeSetup" type="text"
                                   value={infoDetector['last_time_setup']}/>
                        </div>
                    </div>
                    {/*// <!-- Save changes button-->*/}
                </form>
            </div>
        </div>
    );
}

export default withRouter(DetectorInfo);