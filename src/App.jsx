import React from "react";
import { Switch } from "react-router";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <AuthenticatedRoute
          restrict={[0]} // only admin can access dashboard
          path={"/dashboard"}
        >
          <Dashboard />
        </AuthenticatedRoute> */}
        <UnauthenticatedRoute target="/" path={"/dashboard"}>
          <Dashboard />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute target="/" path={"/login"}>
          <Login />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute target="/login" path={"/register"}>
          <Register />
        </UnauthenticatedRoute>

        <AuthenticatedRoute restrict={[1, 2]} path={"/"}>
          <Home />
        </AuthenticatedRoute>
      </Switch>
    </div>
  );
}

export default App;
