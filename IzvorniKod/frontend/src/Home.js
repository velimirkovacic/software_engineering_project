import React from 'react';

import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar'

const welcome = () => {
  return (
    <div classname=''>
      <Navbar />
      <LeftPanel />
      <RightPanel />
      <Calendar />

    </div>
  )
}

export default welcome;