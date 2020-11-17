import React from "react";
import {Route, Switch} from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path={'/dashboard'} render={(props => <Dashboard/>)}/>
            </Switch>
        </div>
    );
}

export default App;
