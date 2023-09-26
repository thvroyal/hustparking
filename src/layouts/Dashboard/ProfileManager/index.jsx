import React from 'react';
import { useLocation } from 'react-router';
import Navbar from './Navbar';
import TabEdit from './TabEdit';
import TabProfile from './TabProfile';
import TabSecurity from './TabSecurity';

function ProfileManager() {
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
export default ProfileManager;
