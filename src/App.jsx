import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";
import Verify from "./pages/Verify";
import PageNotFound from "./pages/404";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "./apis/auth";

function App() {
  const dispatch = useDispatch();
  const loadingVerifyToken = useSelector((state) => state.auth.loading);
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);
  return (
    <div className="App">
      {!loadingVerifyToken && (
        <Switch>
          <AuthenticatedRoute
            restrict={[2]} // only admin can access dashboard
            path={"/dashboard"}
          >
            <Dashboard />
          </AuthenticatedRoute>
          {/* <UnauthenticatedRoute target="/" path={"/dashboard"}>
          <Dashboard />
        </UnauthenticatedRoute> */}
          <UnauthenticatedRoute target="/home" path={"/login"}>
            <Login />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute target="/login" path={"/register"}>
            <Register />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute target="/login" path={"/verify"}>
            <Verify />
          </UnauthenticatedRoute>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <AuthenticatedRoute restrict={[1, 2]} path={"/home"}>
            <Home />
          </AuthenticatedRoute>
          <Route component={PageNotFound} />
        </Switch>
      )}
    </div>
  );
}

export default App;
