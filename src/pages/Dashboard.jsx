import React from "react";
import Sidebar from "../layouts/Sidebar/Sidebar";
import Header from "../layouts/Header/Header";
import {Route, Switch} from "react-router";
import Footer from "../layouts/Footer/Footer";
import Detectors from "../layouts/Dashboard/Detectors";
import DashboardHome from "../layouts/Dashboard/DashboardHome";
import Users from "../layouts/Dashboard/Users";
import UserInfo from "../layouts/Dashboard/UserInfo";
import Contract from "../layouts/Dashboard/Contract";
import Invoice from "../layouts/Dashboard/Invoice";

function Dashboard(props) {
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
                            <Route exact path={'/dashboard/fields'} render={props => <Fields {...props}/>}/>
                            <Route exact path={'/dashboard/fields/:idField'} render={props => <Detectors {...props}/>}/>

                            <Route exact path={'dashboard/users'} render={props => <Users {...props}/>}/>
                            <Route exact path={'dashboard/users/:idUser'} render={props => <UserInfo {...props}/>}/>

                            <Route exact path={'dashboard/contract'} render={props => <Contract {...props}/>}/>
                            <Route exact path={'dashboard/contract/:idContract'} render={props => <Invoice {...props}/>}/>

                            <Route path='/dashboard' render={props => <DashboardHome {...props} />}/>
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