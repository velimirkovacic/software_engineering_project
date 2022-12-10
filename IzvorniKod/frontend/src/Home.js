import React, {useEffect, useState} from 'react';

import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Navbar from './components/Navbar';

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import hrLocale from '@fullcalendar/core/locales/hr'
import { ReactSession } from 'react-client-session'

let calendarRef = React.createRef()

const addEvents = () => {
  const api = calendarRef.current.getApi();
  //events.map((ev) => api.addEvent(ev))
}

const getEvents = () => {
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/JSON'
      }
  };
  fetch('/api/events', options)
      .then(response => {
          console.log(response);
      });
}


const Welcome = () => {
  useEffect(() => {
    getEvents();
  }, [])
  return (
    <div className=''>
      <Navbar />
      <LeftPanel />
      <RightPanel />
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        initialView='timeGridWeek'
        allDaySlot={false}
        slotMinTime={'7:00:00'}
        height={500}
        locale={hrLocale}
        slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit'
        }}
        headerToolbar={{
            left: 'prev next',
            center: 'title',
            right: 'today'
        }}
      />
    </div>
  )
}

export default Welcome;