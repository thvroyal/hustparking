import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <AuthenticatedRoute
          restrict={2} // only admin can access dashboard
          path={"/dashboard"}
          render={(props) => <Dashboard />}
        />
        <Route path={"/login"} render={(props) => <Login />} />
        <Route path={"/register"} render={(props) => <Register />} />

        <Route path={"/"} render={(props) => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
