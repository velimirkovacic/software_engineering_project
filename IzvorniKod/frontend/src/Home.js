import React from 'react';
import '../App';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Navbar from './Navbar';

const welcome = () => {
  return (
    <div classname=''>
      <Navbar />
      <LeftPanel />
      <RightPanel />

    </div>
  )
}

export default welcome;