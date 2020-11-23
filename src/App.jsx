import React from "react";
import {Route, Switch} from "react-router";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path={'/dashboard'} render={(props => <Dashboard/>)}/>
                <Route exact path={'/login'} render={(props => <Login/>)}/>
                <Route exact path={'/register'} render={(props => <Register/>)}/>

                <Route path={'/'} render={(props => <Home/>)}/>
            </Switch>
        </div>
    );
}

export default App;