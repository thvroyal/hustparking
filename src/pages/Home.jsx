import React from "react";
import {withRouter} from "react-router";

function Home() {
    return (
    <h1>This Is Home Page</h1>
    )
}

export default React.memo(withRouter(Home));