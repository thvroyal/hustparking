import React from 'react';
import { useDispatch } from 'react-redux';
import { ClearTokenBackend } from '../../apis/auth';

function Header() {
  const dispatch = useDispatch();
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

      <button className="position-absolute btn btn-outline-danger btn-sm" type="button" style={{ right: '20px' }} onClick={logOut}>Log out</button>
    </nav>
  );
}

export default React.memo(Header);
