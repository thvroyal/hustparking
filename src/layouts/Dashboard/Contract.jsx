import React from "react";
import {withRouter} from "react-router";

function Contract(props) {
    return (
        <h1>This is Contract</h1>
    )
}

export default React.memo(withRouter(Contract));