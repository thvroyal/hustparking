import React from "react";
import {withRouter} from "react-router";
import CardField from "../../components/CardField";
import {Link} from "react-router-dom";

function Fields(props) {
    return (
        <>
            <h1 className="h3 mb-5 text-gray-800">Fields</h1>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <Link to={'/dashboard/fields/1'} className="card-link">
                        <CardField name="D9 - Bach Khoa" color="primary" id={'#20172916'} data={[60,10]}/>
                    </Link>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <CardField name="D3 - Bach Khoa" color="danger" id={'#20172916'}/>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <CardField name="C9 - Bach Khoa" color="success" id={'#20172916'}/>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <CardField name="D9 - Bach Khoa" color="dark" id={'#20172916'}/>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <CardField name="D9 - Bach Khoa" color="primary" id={'#20172916'}/>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <CardField name="D9 - Bach Khoa" color="primary" id={'#20172916'}/>
                </div>
            </div>
        </>
    )
}

export default React.memo(withRouter(Fields));