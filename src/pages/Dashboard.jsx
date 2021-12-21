import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import Sidebar from '../layouts/Sidebar/Sidebar';
import Header from '../layouts/Header/Header';

import Footer from '../layouts/Footer/Footer';
import Detectors from '../layouts/Dashboard/Detectors';
import DashboardHome from '../layouts/Dashboard/DashboardHome';
import Users from '../layouts/Dashboard/Users';
import UserInfo from '../layouts/Dashboard/UserInfo';
import Contract from '../layouts/Dashboard/Contract';
// import Invoice from "../layouts/Dashboard/Invoice";
import Fields from '../layouts/Dashboard/Fields';
import Slot from '../layouts/Dashboard/Slot';
import Gateway from '../layouts/Dashboard/Gateway';
// import DetectorDebug from '../layouts/Dashboard/Debug/DetectorDebug';
import DetectorInfo from '../layouts/Dashboard/DetectorInfo';
import Image1 from '../layouts/Dashboard/Image1';
import Image2 from '../layouts/Dashboard/Image2';
import CreateManager from '../layouts/Dashboard/CreateManager';
import Analysis from '../layouts/Dashboard/Analysis';
import ProfileManager from '../layouts/Dashboard/ProfileManager';
import Managers from '../layouts/Dashboard/ListManager';
import Tags from '../layouts/Dashboard/Tags';
import Debug from '../layouts/Dashboard/Debug';

function Dashboard() {
  const match = useRouteMatch();

  return (
    <div id="wrapper">
      {/* Page Wrapper */}
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Content Wrapper */}
        <div id="content">
          <Header />
          <div className="container-fluid">
            <Switch>
              <Route
                exact
                path={match.url}
                render={(props) => <DashboardHome {...props} />}
              />

              <Route
                exact
                path={`${match.url}/fields`}
                render={(props) => <Fields {...props} />}
              />
              <Route
                exact
                path={`${match.url}/fields/:idSlot`}
                render={(props) => <Slot {...props} />}
              />

              <Route
                exact
                path={`${match.url}/gateway`}
                render={(props) => <Gateway {...props} />}
              />
              <Route
                exact
                path={`${match.url}/gateway/:idDetector`}
                render={(props) => <Detectors {...props} />}
              />

              <Route
                exact
                path={`${match.url}/users`}
                render={(props) => <Users {...props} />}
              />
              <Route
                exact
                path={`${match.url}/users/:idUser`}
                render={(props) => <UserInfo {...props} />}
              />

              <Route
                exact
                path={`${match.url}/contract/:idUser`}
                render={(props) => <Contract {...props} />}
              />

              {/* <Route
                exact
                path={`${match.url}/debug-detector`}
                render={(props) => <DetectorDebug {...props} />}
              /> */}

              <Route
                exact
                path={`${match.url}/detector/:idDetector`}
                render={(props) => <DetectorInfo {...props} />}
              />

              <Route
                exact
                path={`${match.url}/image1`}
                render={(props) => <Image1 {...props} />}
              />
              <Route
                exact
                path={`${match.url}/image2`}
                render={(props) => <Image2 {...props} />}
              />
              <Route
                exact
                path={`${match.url}/new-manager`}
                render={(props) => <CreateManager {...props} />}
              />
              <Route
                exact
                path={`${match.url}/analysis`}
                render={(props) => <Analysis {...props} />}
              />
              <Route
                exact
                path={`${match.url}/profile`}
                render={(props) => <ProfileManager {...props} />}
              />
              <Route
                exact
                path={`${match.url}/managers`}
                render={(props) => <Managers {...props} />}
              />
              <Route
                exact
                path={`${match.url}/tags`}
                render={(props) => <Tags {...props} />}
              />
              <Route
                exact
                path={`${match.url}/debug`}
                render={(props) => <Debug {...props} />}
              />
            </Switch>
          </div>
        </div>
        {/*    End Of Content Wrapper */}
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
