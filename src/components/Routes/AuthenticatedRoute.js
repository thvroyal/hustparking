import React from "react";
import { Redirect, Route, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ClearTokenBackend } from "../../apis/auth";

export default function AuthenticatedRoute({ children, restrict, ...rest }) {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  if (isAuthenticated && !restrict.includes(role)) {
    console.log("Not Restrict");
    dispatch(ClearTokenBackend());
    return <Redirect to="/login" />;
  } else
    return (
      <Route {...rest}>
        {isAuthenticated && restrict.includes(role) ? (
          children
        ) : (
          <Redirect to={`/login?redirect=${pathname}${search}`} />
        )}
      </Route>
    );
}
