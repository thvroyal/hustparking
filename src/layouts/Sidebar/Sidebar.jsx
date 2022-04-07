import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { SET_AD } from '../../helpers/constants';

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
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggle ? 'toggled' : ''}`}
        id="accordionSidebar"
      >
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
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

        <hr className="sidebar-divider" />
        {/* <div className="h3 text-center text-white">MANAGEMENT</div> */}
        <div className="sidebar-heading">MANAGEMENT</div>

        {role === SET_AD && (
          <li
            className={`nav-item ${current === '/dashboard/managers' ? 'active' : null}`}
          >
            <Link
              className="nav-link"
              to="/dashboard/managers"
              onClick={() => updateCurrentUrl('/dashboard/managers')}
            >
              <i className="fas fa-users-cog" />
              <span>Manager</span>
            </Link>
          </li>
        )}

        <li
          className={`nav-item ${current === '/dashboard/fields' ? 'active' : null}`}
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

        {role === SET_AD && (
          <li
            className={`nav-item ${current === '/dashboard/users' ? 'active' : null}`}
          >
            <Link
              className="nav-link"
              to="/dashboard/users"
              onClick={() => updateCurrentUrl('/dashboard/users')}
            >
              <i className="fas fa-fw fa-user" />
              <span>Users</span>
            </Link>
          </li>
        )}

        {true && (
          <li
            className={`nav-item ${current === '/dashboard/tags' ? 'active' : null}`}
          >
            <Link
              className="nav-link"
              to="/dashboard/tags"
              onClick={() => updateCurrentUrl('/dashboard/tags')}
            >
              <i className="fas fa-users-cog" />
              <span>Tags</span>
            </Link>
          </li>
        )}

        <li
          className={`nav-item ${current === '/dashboard/contract' ? 'active' : null}`}
        >
          <Link
            className="nav-link"
            to="/dashboard/contract/all"
            onClick={() => updateCurrentUrl('/dashboard/contract')}
          >
            <i className="fas fa-fw fa-file-contract" />
            <span>Contracts</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Debug</div>
        <li
          className={`nav-item ${current === '/dashboard/debug?tab=detector' ? 'active' : null}`}
        >
          <Link
            className="nav-link"
            to="/dashboard/debug?tab=detector"
            onClick={() => updateCurrentUrl('/dashboard/debug?tab=detector')}
          >
            <i className="fas fa-fw fa-bug" />
            <span>Debug</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />

        <li
          className={`nav-item ${current === '/dashboard/imageView' ? 'active' : null}`}
        >
          <Link
            className="nav-link"
            to="/dashboard/imageView"
            onClick={() => updateCurrentUrl('/dashboard/imageView')}
          >
            <i className="fas fa-fw fa-image" />
            <span>Image View</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            aria-label="sidebar"
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
