import React, {useState} from "react";
import {withRouter} from "react-router";

const Sidebar = React.memo(function Sidebar(props) {
    const [toggle, handleToggle] = useState(false);

    function handleToggleButton() {
        handleToggle(!toggle);
    }

    return (
        <>
            <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggle ? 'toggled' : ''}`}
                id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"/>
                    </div>
                    <div className="sidebar-brand-text mx-3">S Parking</div>
                </a>

                <hr className="sidebar-divider my-0"/>

                <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"/>
                        <span>Dashboard</span></a>
                </li>

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">
                    Interface
                </div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                       aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"/>
                        <span>Components</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Components:</h6>
                            <a className="collapse-item" href="buttons.html">Buttons</a>
                            <a className="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapseUtilities"
                       aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"/>
                        <span>Utilities</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Utilities:</h6>
                            <a className="collapse-item" href="utilities-color.html">Colors</a>
                            <a className="collapse-item" href="utilities-border.html">Borders</a>
                            <a className="collapse-item" href="utilities-animation.html">Animations</a>
                            <a className="collapse-item" href="utilities-other.html">Other</a>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">
                    Addons
                </div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapsePages"
                       aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"/>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider"/>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"/>
                        <span>Charts</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table"/>
                        <span>Tables</span></a>
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
