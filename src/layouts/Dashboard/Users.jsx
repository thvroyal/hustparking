import React from "react";
import {withRouter} from "react-router";

function Users(props) {
    return (
        <h1>This is List User</h1>
    )
}

export default React.memo(withRouter(Users));