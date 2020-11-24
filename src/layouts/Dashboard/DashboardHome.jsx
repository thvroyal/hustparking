import React from "react";
import {withRouter} from "react-router";

function DashboardHome(props) {
    return (
        <h1>This is Dashboard Home</h1>
    )
}

export default React.memo(withRouter(DashboardHome));