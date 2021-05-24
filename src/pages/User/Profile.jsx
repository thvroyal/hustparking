import React from 'react';
import { useLocation } from 'react-router';
import Navbar from '../../layouts/User/Profile/Navbar';
import TabEdit from '../../layouts/User/Profile/TabEdit';
import TabProfile from '../../layouts/User/Profile/TabProfile';
import TabSecurity from '../../layouts/User/Profile/TabSecurity';

function Profile() {
  const location = useLocation().search.split('=')[1]; // get tab name
  return (
    <>
      <Navbar />
      {location === 'profile' && <TabProfile />}
      {location === 'edit' && <TabEdit />}
      {location === 'security' && <TabSecurity />}
    </>
  );
}
export default Profile;
