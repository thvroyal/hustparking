/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Sidebar = React.memo(() => {
  const [toggle, handleToggle] = useState(false);
  const [current, setUrl] = useState(useLocation().pathname);
  const { role } = useSelector((state) => state.auth);

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
          toggle ? 'toggled' : ''
        }`}
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">S Parking</div>
        </Link>

        <hr className="sidebar-divider my-0" />
        <li
          className={`nav-item ${current === '/dashboard' ? 'active' : null}`}
        >
          <Link
            to="/dashboard"
            className="nav-link"
            onClick={() => updateCurrentUrl('/dashboard')}
          >
            <i className="fas fa-fw fa-car" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li
          className={`nav-item ${current === '/dashboard/analysis' ? 'active' : null}`}
        >
          <Link
            to="/dashboard/analysis"
            className="nav-link"
            onClick={() => updateCurrentUrl('/dashboard/analysis')}
          >
            <i className="fas fa-chart-bar" />
            <span>Analysis</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Manager</div>

        <li
          className={`nav-item ${
            current === '/dashboard/fields' ? 'active' : null
          }`}
        >
          <Link
            className="nav-link"
            to="/dashboard/fields"
            onClick={() => updateCurrentUrl('/dashboard/fields')}
          >
            <i className="fas fa-fw fa-route" />
            <span>Fields</span>
          </Link>
        </li>

        { role === 2 && (
        <li
          className={`nav-item ${
            current === '/dashboard/users' ? 'active' : null
          }`}
        >
          <Link
            className="nav-link"
            to="/dashboard/users"
            onClick={() => updateCurrentUrl('/dashboard/users')}
          >
            <i className="fas fa-fw fa-user" />
            <span>List User</span>
          </Link>
        </li>
        )}

        { role === 2 && (
        <li
          className={`nav-item ${
            current === '/dashboard/managers' ? 'active' : null
          }`}
        >
          <Link
            className="nav-link"
            to="/dashboard/managers"
            onClick={() => updateCurrentUrl('/dashboard/managers')}
          >
            <i className="fas fa-users-cog" />
            <span>List Manager</span>
          </Link>
        </li>
        )}

        <li
          className={`nav-item ${
            current === '/dashboard/contract' ? 'active' : null
          }`}
        >
          <Link
            className="nav-link"
            to="/dashboard/contract/all"
            onClick={() => updateCurrentUrl('/dashboard/contract')}
          >
            <i className="fas fa-fw fa-file-contract" />
            <span>Contract</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            current === '/dashboard/image1' ? 'active' : null
          }`}
        >
          <Link
            className="nav-link"
            to="/dashboard/image1"
            onClick={() => updateCurrentUrl('/dashboard/image1')}
          >
            <i className="fas fa-fw fa-image" />
            <span>Image 1</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            current === '/dashboard/image2' ? 'active' : null
          }`}
        >
          <Link
            className="nav-link"
            to="/dashboard/image2"
            onClick={() => updateCurrentUrl('/dashboard/image2')}
          >
            <i className="fas fa-fw fa-image" />
            <span>Image 2</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Debug</div>
        <li
          className={`nav-item ${
            current === '/dashboard/debug-detector' ? 'active' : null
          }`}
        >
          <Link
            className="nav-link"
            to="/dashboard/debug-detector"
            onClick={() => updateCurrentUrl('/dashboard/debug-detector')}
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
            type="button"
          />
        </div>

      </ul>
    </>
  );
});

export default withRouter(Sidebar);
