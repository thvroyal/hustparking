import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClearTokenBackend } from '../../apis/auth';
import { setAd, setMn } from '../../helpers/constants';

function Header() {
  const dispatch = useDispatch();
  const refDropdown = useRef();
  const { info, role } = useSelector((state) => state.auth);
  const [show, toggleShow] = useState(false);
  function clickOutside(event) {
    if (refDropdown && !refDropdown.current.contains(event.target)) {
      toggleShow(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);
  function handleShow() {
    toggleShow(!show);
  }
  function logOut() {
    dispatch(ClearTokenBackend());
  }
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow position-relative">
      {/* // <!-- Sidebar Toggle (Topbar) --> */}
      <form className="form-inline">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          type="button"
        >
          <i className="fa fa-bars" />
        </button>
      </form>

      {/* // <!-- Topbar Search --> */}
      <div
        className="dropdown text-end position-absolute"
        ref={refDropdown}
        style={{ right: '20px' }}
      >
        <a
          href="#foo"
          className={`d-block link-dark text-decoration-none dropdown-toggle ${
            show ? 'show' : ''
          }`}
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={handleShow}
        >
          <img
            src={info.image ? info.image : `https://i.pravatar.cc/100?u=${info.id}`}
            alt="avatar"
            width="32"
            height="32"
            className="rounded-circle"
          />
        </a>
        <ul
          className={`dropdown-menu text-small ${show ? 'show' : ''}`}
          aria-labelledby="dropdownUser1"
          style={
                show
                  ? {
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    margin: '0px',
                    transform: 'translate(-109px, 34px)',
                  }
                  : {}
              }
          data-popper-placement="bottom-end"
        >
          {role === setAd && (
          <li>
            <Link className="nav-link dropdown-item" to="/dashboard/new-manager">
              New manager
            </Link>
          </li>
          )}
          {role === setMn && (
          <li>
            <Link className="nav-link dropdown-item" to="/dashboard/profile?tab=profile">
              Profile
            </Link>
          </li>
          )}

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <a
              className="nav-link dropdown-item"
              href="#foo"
              onClick={logOut}
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default React.memo(Header);
