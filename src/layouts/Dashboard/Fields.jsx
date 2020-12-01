import React, {useEffect} from "react";
import {withRouter} from "react-router";
import CardField from "../../components/CardField";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getField} from "../../apis/fieldApi";
import {Spinner} from "react-bootstrap";
import {getGWField} from "../../apis/gatewayFieldApi";

function Fields(props) {
    const dispatch = useDispatch();
    const listField = useSelector(state => state.field.data);
    const listGWField = useSelector(state => state.gatewayField.data);

    useEffect(() => {
        dispatch(getField());
        dispatch(getGWField());
    }, [dispatch]);

    //10s Reload
    return (
        <>
            <h1 className="h3 mb-5 text-gray-800">Fields</h1>
            <div className="row">
                {listField ? listField.map((item, index) => (
                    <div className="col-xl-3 col-md-6 mb-4" key={index}>
                        <Link to={`/dashboard/fields/${item.id}`} className="card-link">
                            <CardField name={item.position} id={item.id}
                                       data={[item.busySlot, item.totalSlot - item.busySlot]} GW={listGWField}/>
                        </Link>
                    </div>
                )): <Spinner animation='border' color="primary"/> }
            </div>
        </>
    )
}

export default React.memo(withRouter(Fields));