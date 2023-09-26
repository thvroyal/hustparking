import React from 'react';
import { useLocation } from 'react-router';
import Navbar from './NavbarTag';
import DetectorDebug from './DetectorDebug';
import TagDebug from './TagDebug';

function Debug() {
  const location = useLocation().search.split('=')[1]; // get tab name
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800 pt-2">Debug</h1>
      <p className="mb-4">Checking Realtime. . . </p>
      <Navbar />
      {location === 'detector' && <DetectorDebug />}
      {location === 'tag' && <TagDebug />}
    </>
  );
}
export default Debug;
