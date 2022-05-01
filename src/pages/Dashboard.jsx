import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import Maps2D from '../layouts/Dashboard/2D_maps';
import Maps2DC9 from '../layouts/Dashboard/2D_maps_C9';
import Analysis from '../layouts/Dashboard/Analysis';
import Contract from '../layouts/Dashboard/Contract';
import CreateManager from '../layouts/Dashboard/CreateManager';
import DashboardHome from '../layouts/Dashboard/DashboardHome';
import Debug from '../layouts/Dashboard/Debug';
// import DetectorDebug from '../layouts/Dashboard/Debug/DetectorDebug';
import DetectorInfo from '../layouts/Dashboard/DetectorInfo';
import Detectors from '../layouts/Dashboard/Detectors';
// import Invoice from "../layouts/Dashboard/Invoice";
import Fields from '../layouts/Dashboard/Fields';
import Gateway from '../layouts/Dashboard/Gateway';
import ImageView from '../layouts/Dashboard/ImageView';
import ImageViewC9 from '../layouts/Dashboard/ImageView/ImageViewC9';
import ImageViewD35 from '../layouts/Dashboard/ImageView/ImageViewD35';
import Managers from '../layouts/Dashboard/ListManager';
import ProfileManager from '../layouts/Dashboard/ProfileManager';
import Slot from '../layouts/Dashboard/Slot';
import Tags from '../layouts/Dashboard/Tags';
import UserInfo from '../layouts/Dashboard/UserInfo';
import Users from '../layouts/Dashboard/Users';
import Footer from '../layouts/Footer/Footer';
import Header from '../layouts/Header/Header';
import Sidebar from '../layouts/Sidebar/Sidebar';

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
                path={`${match.url}/field/:idField/gateway/:idDetector`}
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

              <Route
                exact
                path={`${match.url}/detector/:idDetector`}
                render={(props) => <DetectorInfo {...props} />}
              />

              <Route
                exact
                path={`${match.url}/imageView`}
                render={(props) => <ImageView {...props} />}
              />
              <Route
                exact
                path={`${match.url}/fields/:idSlot/2d_maps`}
                render={(props) => <Maps2D {...props} />}
              />
              <Route
                exact
                path={`${match.url}/fields/:idSlot/2d_maps_C9`}
                render={(props) => <Maps2DC9 {...props} />}
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
              <Route
                exact
                path={`${match.url}/imageView?tab=D35`}
                render={(props) => <ImageViewD35 {...props} />}
              />
              <Route
                exact
                path={`${match.url}/imageView?tab=C9`}
                render={(props) => <ImageViewC9 {...props} />}
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
