import React from "react";
import Sidebar from "../layouts/Sidebar/Sidebar";
import Header from "../layouts/Header/Header";
import {Route, Switch, useRouteMatch} from "react-router";
import Footer from "../layouts/Footer/Footer";
import Detectors from "../layouts/Dashboard/Detectors";
import DashboardHome from "../layouts/Dashboard/DashboardHome";
import Users from "../layouts/Dashboard/Users";
import UserInfo from "../layouts/Dashboard/UserInfo";
import Contract from "../layouts/Dashboard/Contract";
import Invoice from "../layouts/Dashboard/Invoice";
import Fields from "../layouts/Dashboard/Fields";
import Slot from "../layouts/Dashboard/Slot";

function Dashboard(props) {
    const match = useRouteMatch();
    return (
        <div id="wrapper">
            {/*Page Wrapper*/}
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                {/*Content Wrapper*/}
                <div id="content">
                    <Header/>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path={match.url} render={props => <DashboardHome {...props} />}/>

                            <Route exact path={`${match.url}/fields`} render={props => <Fields {...props}/>}/>
                            <Route exact path={`${match.url}/fields/:idField`} render={props => <Slot {...props}/>}/>

                            <Route exact path={`${match.url}/users`} render={props => <Users {...props}/>}/>
                            <Route exact path={`${match.url}/users/:idUser`} render={props => <UserInfo {...props}/>}/>

                            <Route exact path={`${match.url}/contract`} render={props => <Contract {...props}/>}/>
                            <Route exact path={`${match.url}/contract/:idContract`} render={props => <Invoice {...props}/>}/>

                        </Switch>
                    </div>
                </div>
                {/*    End Of Content Wrapper*/}
                <Footer/>
            </div>
        </div>
    )
}

export default Dashboard;