import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import CardGateway from "../../components/CardGateway";
import {useDispatch, useSelector} from "react-redux";
import {getGateway} from "../../apis/GatewayApi";

function Gateway(props) {
    const dispatch = useDispatch();
    const listGateway = useSelector(state => state.gateway.data);

    useEffect(() => {
        dispatch(getGateway());
    }, [dispatch])

    return (
        <>
            <h1 className="h3 mb-5 text-gray-800">Fields</h1>
            <div className="row">
                {listGateway ? listGateway.map((item, index) => (
                    <div className="col-xl-2 col-md-6 mb-4" key={index}>
                        <Link to={`/dashboard/gateway/${item.id}`} className="card-link">
                            <CardGateway id={item.id} totalDetector={item.totalDetector} address={item.address}/>
                        </Link>
                    </div>
                )) : <Spinner animation='border' color="primary"/>}
            </div>
        </>
    );
}

export default withRouter(Gateway);