import React from 'react';
import { useLocation } from 'react-router';
import Navbar from './Navbar';
import ImageViewD35 from './ImageViewD35';
import ImageViewC9 from './ImageViewC9';

function ImageView() {
  const location = useLocation().search.split('=')[1]; // get tab name
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Image View</h1>
      <p className="mb-4">Checking Realtime. . . </p>
      <Navbar />
      {location === 'D35' && <ImageViewD35 />}
      {location === 'C9' && <ImageViewC9 />}
    </>
  );
}
export default ImageView;
