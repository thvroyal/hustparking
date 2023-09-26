import React from 'react';
import { Switch, useRouteMatch } from 'react-router';
import AuthenticatedRoute from '../components/Routes/AuthenticatedRoute';
import Footer from '../layouts/Footer/Footer';
import HeaderMain from '../layouts/Header/HeaderMain';
import BookingForm from '../layouts/User/BookingForm';
import Checkin from '../layouts/User/Checkin';
import Contracts from './User/Contracts';
import Profile from './User/Profile';
import LiveMap from './LiveMap';

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
          <AuthenticatedRoute restrict={[1]} path={`${url}/livemap`} exact>
            <LiveMap />
          </AuthenticatedRoute>
          <AuthenticatedRoute restrict={[1]} path={`${url}/contracts`} exact>
            <Contracts />
          </AuthenticatedRoute>
          <AuthenticatedRoute restrict={[1]} path={`${url}/profile`} exact>
            <Profile />
          </AuthenticatedRoute>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default React.memo(Home);
