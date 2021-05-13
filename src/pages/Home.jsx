import React from "react";

import { Switch, useRouteMatch, withRouter } from "react-router";

import AuthenticatedRoute from "../components/Routes/AuthenticatedRoute";
import Footer from "../layouts/Footer/Footer";
import BookingForm from "../layouts/User/BookingForm";
import Contracts from "../pages/User/Contracts";
import HeaderMain from "../layouts/Header/HeaderMain";

function Home() {
  const { url } = useRouteMatch();
  return (
    <>
      <HeaderMain />
      <div className="container">
        <Switch>
          <AuthenticatedRoute restrict={[1]} path={`${url}`} exact>
            <BookingForm />
          </AuthenticatedRoute>
          <AuthenticatedRoute restrict={[1]} path={`${url}/contracts`} exact>
            <Contracts />
          </AuthenticatedRoute>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default React.memo(Home);
