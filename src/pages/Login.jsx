import React from "react";
import {withRouter} from "react-router";

function Login() {
    return (
        <h1>This Is Login Page</h1>
    )
}

export default React.memo(withRouter(Login));