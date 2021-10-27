import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LiveMap from './pages/LiveMap';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import UnauthenticatedRoute from './components/Routes/UnauthenticatedRoute';
import Verify from './pages/Verify';
import PageNotFound from './pages/404';
import { verifyToken } from './apis/auth';
import ForgotPassword from './pages/ForgotPassword';

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
            restrict={[2, 3]} // only admin can access dashboard
            path="/dashboard"
          >
            <Dashboard />
          </AuthenticatedRoute>
          <UnauthenticatedRoute target="/login" path="/live-map">
            <LiveMap />
          </UnauthenticatedRoute>
          {/* <UnauthenticatedRoute target="/" path="/dashboard">
            <Dashboard />
          </UnauthenticatedRoute> */}
          <UnauthenticatedRoute target="/home" path="/login">
            <Login />
          </UnauthenticatedRoute>

          <UnauthenticatedRoute target="/login" path="/register">
            <Register />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute target="/login" path="/verify">
            <Verify />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute target="/login" path="/forgot-password">
            <ForgotPassword />
          </UnauthenticatedRoute>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <AuthenticatedRoute restrict={[1]} path="/home">
            <Home />
          </AuthenticatedRoute>
          <Route component={PageNotFound} />
        </Switch>
      )}
    </div>
  );
}

export default App;
