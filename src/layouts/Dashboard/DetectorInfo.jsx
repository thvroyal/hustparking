import React from 'react';
import {withRouter} from "react-router";

function DetectorInfo(props) {
    return (
        <div className="card mb-4 w-50">
            <div className="card-header text-primary text-lg">Detector Info</div>
            <div className="card-body">
                <form>
                    {/*// <!-- Form Group (username)-->*/}
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="inputUsername">Detector ID</label>
                        <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username"
                               value="100"/>
                    </div>
                    {/*// <!-- Form Row-->*/}
                    <div className="form-row">
                        {/*// <!-- Form Group (first name)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="inputFirstName">Address Detector</label>
                            <input className="form-control" id="inputFirstName" type="text"
                                   placeholder="Enter your first name" value="2.2.2.555"/>
                        </div>
                        {/*// <!-- Form Group (last name)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="inputLastName">Address Gateway</label>
                            <input className="form-control" id="inputLastName" type="text"
                                   placeholder="Enter your last name" value="1.1.1.1"/>
                        </div>
                    </div>
                    {/*// <!-- Form Row        -->*/}
                    <div className="form-row">
                        {/*// <!-- Form Group (organization name)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="inputOrgName">Status</label>
                            <input className="form-control" id="inputOrgName" type="text"
                                   placeholder="Enter your organization name" value="Busy"/>
                        </div>
                        {/*// <!-- Form Group (location)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="inputLocation">Batery</label>
                            <input className="form-control" id="inputLocation" type="text"
                                   placeholder="Enter your location" value="60%"/>
                        </div>
                    </div>
                    {/*// <!-- Form Group (email address)-->*/}
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="inputEmailAddress">Communication Level</label>
                        <input className="form-control" id="inputEmailAddress" type="email"
                               placeholder="Enter your email address" value="02"/>
                    </div>
                    {/*// <!-- Form Row-->*/}
                    <div className="form-row">
                        {/*// <!-- Form Group (phone number)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="inputPhone">Last Update</label>
                            <input className="form-control" id="inputPhone" type="text"
                                   placeholder="Enter your phone number" value="10/02/2020 8:00AM"/>
                        </div>
                        {/*// <!-- Form Group (birthday)-->*/}
                        <div className="form-group col-md-6">
                            <label className="small mb-1" htmlFor="inputBirthday">Last Setup</label>
                            <input className="form-control" id="inputBirthday" type="text" name="birthday"
                                   placeholder="Enter your birthday" value="01/01/2019 10:00AM"/>
                        </div>
                    </div>
                    {/*// <!-- Save changes button-->*/}
                </form>
            </div>
        </div>
    );
}

export default withRouter(DetectorInfo);