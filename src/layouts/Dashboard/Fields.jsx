import React from "react";
import {withRouter} from "react-router";

function Fields(props) {
    return (
        <h1>This is Fields</h1>
    )
}

export default React.memo(withRouter(Fields));