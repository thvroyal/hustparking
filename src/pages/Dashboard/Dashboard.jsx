import React from "react";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import Header from "../../layouts/Header/Header";
import {Route, Switch} from "react-router";
import Table from "../../layouts/Dashboard/Table";
import Footer from "../../layouts/Footer/Footer";

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
                            <Route path={'/dashboard'} render={props => <Table {...props}/>}/>
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