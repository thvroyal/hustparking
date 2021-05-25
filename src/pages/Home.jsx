import React from 'react';

import { Switch, useRouteMatch } from 'react-router';

import AuthenticatedRoute from '../components/Routes/AuthenticatedRoute';
import Footer from '../layouts/Footer/Footer';
import BookingForm from '../layouts/User/BookingForm';
import Contracts from './User/Contracts';
import HeaderMain from '../layouts/Header/HeaderMain';
import Profile from './User/Profile';
import Checkin from '../layouts/User/Checkin';

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
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default React.memo(Home);
