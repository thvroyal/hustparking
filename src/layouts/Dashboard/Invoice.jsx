import React from "react";
import {withRouter} from "react-router";

function Invoice(props) {
    return (
        <h1>This is Dashboard Home</h1>
    )
}

export default React.memo(withRouter(Invoice));