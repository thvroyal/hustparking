import React from "react";
import {withRouter} from "react-router";

function Register() {
    return (
        <h1>This Is Register Page</h1>
    )
}

export default React.memo(withRouter(Register));