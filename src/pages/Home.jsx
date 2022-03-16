import React from 'react';
import { Switch, useRouteMatch } from 'react-router';
import AuthenticatedRoute from '../components/Routes/AuthenticatedRoute';
import Footer from '../layouts/Footer/Footer';
import HeaderMain from '../layouts/Header/HeaderMain';
import BookingForm from '../layouts/User/BookingForm';
import Checkin from '../layouts/User/Checkin';
import Contracts from './User/Contracts';
import Profile from './User/Profile';
import Maps2D from '../layouts/Dashboard/2D_maps';

function Home() {
  const { url } = useRouteMatch();
  return (
    <>
      <HeaderMain />
      <div className="container">
        <Switch>
          <AuthenticatedRoute restrict={[1]} path={`${url}`} exact>
            <Checkin />
            <BookingForm />
          </AuthenticatedRoute>
          <AuthenticatedRoute restrict={[1]} path={`${url}/contracts`} exact>
            <Contracts />
          </AuthenticatedRoute>
          <AuthenticatedRoute restrict={[1]} path={`${url}/profile`} exact>
            <Profile />
          </AuthenticatedRoute>
          <AuthenticatedRoute restrict={[1]} path={`${url}/maps_2d`} exact>
            <Maps2D />
          </AuthenticatedRoute>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default React.memo(Home);
