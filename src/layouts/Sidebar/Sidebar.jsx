import React, {useState} from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

const Sidebar = React.memo(function Sidebar(props) {
    const [toggle, handleToggle] = useState(false);

    function handleToggleButton() {
        handleToggle(!toggle);
    }

    return (
        <>
            <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggle ? 'toggled' : ''}`}
                id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"/>
                    </div>
                    <div className="sidebar-brand-text mx-3">S Parking</div>
                </Link>

                <hr className="sidebar-divider my-0"/>

                <li className="nav-item active">
                    <Link to={'/dashboard'} className={'nav-link'}>
                        <i className="fas fa-fw fa-tachometer-alt"/>
                        <span>Dashboard</span></Link>
                </li>

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">
                    Manager
                </div>

                {/*<li className="nav-item">*/}
                {/*    <a className="nav-link collapsed" href="#" data-toggle="collapse"*/}
                {/*       data-target="#collapsePages"*/}
                {/*       aria-expanded="true" aria-controls="collapsePages">*/}
                {/*        <i className="fas fa-fw fa-folder"/>*/}
                {/*        <span>Pages</span>*/}
                {/*    </a>*/}
                {/*    <div id="collapsePages" className="collapse" aria-labelledby="headingPages"*/}
                {/*         data-parent="#accordionSidebar">*/}
                {/*        <div className="bg-white py-2 collapse-inner rounded">*/}
                {/*            <h6 className="collapse-header">Login Screens:</h6>*/}
                {/*            <a className="collapse-item" href="login.html">Login</a>*/}
                {/*            <a className="collapse-item" href="register.html">Register</a>*/}
                {/*            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>*/}
                {/*            <div className="collapse-divider"/>*/}
                {/*            <h6 className="collapse-header">Other Pages:</h6>*/}
                {/*            <a className="collapse-item" href="404.html">404 Page</a>*/}
                {/*            <a className="collapse-item" href="blank.html">Blank Page</a>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</li>*/}

                <li className="nav-item">
                    <Link className="nav-link" to={'/fields'}>
                        <i className="fas fa-fw fa-chart-area"/>
                        <span>Fields</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={"/tables"}>
                        <i className="fas fa-fw fa-table"/>
                        <span>Selection 1</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={"/tables"}>
                        <i className="fas fa-fw fa-table"/>
                        <span>Selection 2</span></Link>
                </li>

                <hr className="sidebar-divider d-none d-md-block"/>

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={handleToggleButton}/>
                </div>

                {/*<div className="sidebar-card">*/}
                {/*    <img className="sidebar-card-illustration mb-2" src="../../assets/img/draw_rocket.svg" alt=""/>*/}
                {/*    <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with*/}
                {/*        premium features,*/}
                {/*        components, and more!</p>*/}
                {/*    <a className="btn btn-success btn-sm"*/}
                {/*       href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade*/}
                {/*        to Pro!</a>*/}
                {/*</div>*/}
            </ul>
        </>
    )
})

export default withRouter(Sidebar)
