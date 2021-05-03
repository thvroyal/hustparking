import React, { useState } from "react";
import { useLocation, withRouter } from "react-router";
import { Link } from "react-router-dom";

const Sidebar = React.memo(function Sidebar(props) {
  const [toggle, handleToggle] = useState(false);
  const [current, setUrl] = useState(useLocation().pathname);

  function handleToggleButton() {
    handleToggle(!toggle);
  }

  function updateCurrentUrl(url) {
    setUrl(url);
  }

  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          toggle ? "toggled" : ""
        }`}
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">S Parking</div>
        </Link>

        <hr className="sidebar-divider my-0" />
        <li className={`nav-item ${"/" === current ? "active" : null}`}>
          <Link
            to={"/"}
            className={`nav-link`}
            onClick={() => updateCurrentUrl("/")}
          >
            <i className="fas fa-fw fa-home" />
            <span>Home</span>
          </Link>
        </li>
        <li
          className={`nav-item ${"/dashboard" === current ? "active" : null}`}
        >
          <Link
            to={"/dashboard"}
            className={`nav-link`}
            onClick={() => updateCurrentUrl("/dashboard")}
          >
            <i className="fas fa-fw fa-car" />
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Manager</div>

        <li
          className={`nav-item ${
            "/dashboard/fields" === current ? "active" : null
          }`}
        >
          <Link
            className="nav-link"
            to={"/dashboard/fields"}
            onClick={() => updateCurrentUrl("/dashboard/fields")}
          >
            <i className="fas fa-fw fa-route" />
            <span>Fields</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            "/dashboard/users" === current ? "active" : null
          }`}
        >
          <Link
            className="nav-link"
            to={"/dashboard/users"}
            onClick={() => updateCurrentUrl("/dashboard/users")}
          >
            <i className="fas fa-fw fa-user" />
            <span>List User</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            "/dashboard/contract" === current ? "active" : null
          }`}
        >
          <Link
            className="nav-link"
            to={"/dashboard/contract/all"}
            onClick={() => updateCurrentUrl("/dashboard/contract")}
          >
            <i className="fas fa-fw fa-file-contract" />
            <span>Contract</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            "/dashboard/image1" === current ? "active" : null
          }`}
        >
          <Link
            className="nav-link"
            to={"/dashboard/image1"}
            onClick={() => updateCurrentUrl("/dashboard/image1")}
          >
            <i className="fas fa-fw fa-image" />
            <span>Image 1</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            "/dashboard/image2" === current ? "active" : null
          }`}
        >
          <Link
            className="nav-link"
            to={"/dashboard/image2"}
            onClick={() => updateCurrentUrl("/dashboard/image2")}
          >
            <i className="fas fa-fw fa-image" />
            <span>Image 2</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Debug</div>
        <li
          className={`nav-item ${
            "/dashboard/debug-detector" === current ? "active" : null
          }`}
        >
          <Link
            className="nav-link"
            to={"/dashboard/debug-detector"}
            onClick={() => updateCurrentUrl("/dashboard/debug-detector")}
          >
            <i className="fas fa-fw fa-bug" />
            <span>Debug</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={handleToggleButton}
          />
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
  );
});

export default withRouter(Sidebar);
