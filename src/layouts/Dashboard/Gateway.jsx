import React from 'react';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import CardField from "../../components/CardField";
import {Spinner} from "react-bootstrap";
import CardGateway from "../../components/CardGateway";

function Gateway(props) {
    const listGateway = [
        {
            id: 1,
            total: 100,
            last_updated: null,
        },
        {
            id: 2,
            total: 100,
            last_updated: null,
        },
        {
            id: 3,
            total: 100,
            last_updated: null,
        },
        {
            id: 4,
            total: 100,
            last_updated: null,
        },
    ];
    return (
        <>
            <h1 className="h3 mb-5 text-gray-800">Fields</h1>
            <div className="row">
                {listGateway ? listGateway.map((item, index) => (
                    <div className="col-xl-2 col-md-6 mb-4" key={index}>
                        <Link to={`/dashboard/gateway/${item.id}`} className="card-link">
                            <CardGateway id={item.id} totalDetector={item.total}/>
                        </Link>
                    </div>
                )) : <Spinner animation='border' color="primary"/>}
            </div>
        </>
    );
}

export default withRouter(Gateway);