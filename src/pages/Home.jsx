import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { ClearTokenBackend } from "../apis/auth";
import BookingForm from "../layouts/User/BookingForm";

function Home() {
  const dispatch = useDispatch();
  const [show, toggleShow] = useState(false);
  function handleShow() {
    toggleShow(!show);
  }
  function handleLogOut() {
    dispatch(ClearTokenBackend);
    window.location.reload();
  }
  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {/* <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <svg className="bi me-2" width="40" height="32">
              <use xlink:href="#bootstrap"></use>
            </svg>
          </a> */}

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 link-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="nav-link px-2 link-dark">
                  Dashboard
                </Link>
              </li>
            </ul>

            {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
            />
          </form> */}

            <div className="dropdown text-end">
              <a
                href="#foo"
                className={`d-block link-dark text-decoration-none dropdown-toggle ${
                  show ? "show" : ""
                }`}
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleShow}
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul
                className={`dropdown-menu text-small ${show ? "show" : ""}`}
                aria-labelledby="dropdownUser1"
                style={
                  show
                    ? {
                        position: "absolute",
                        inset: "0px auto auto 0px",
                        margin: "0px",
                        transform: "translate(-109px, 34px)",
                      }
                    : {}
                }
                data-popper-placement="bottom-end"
              >
                <li>
                  <a className="dropdown-item" href="#foo">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#foo">
                    Settings
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#foo"
                    onClick={handleLogOut}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <BookingForm />
      </div>
    </>
  );
}

export default React.memo(withRouter(Home));
