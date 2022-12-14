import React, {useEffect, useState} from 'react';

import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Navbar from './components/Navbar';
import EventInfo from './components/EventInfo'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import hrLocale from '@fullcalendar/core/locales/hr'
import Popup from 'reactjs-popup';

let calendarRef = React.createRef()

const addEvents = events => {
  const api = calendarRef.current.getApi();
  events.map((ev) => {
    let calendarEvent = {
      id: ev.id,
      title: '[' + ev.location + '] ' + ev.name,
      start: new Date(ev.beginningTimestamp).toISOString(),
      end: new Date(ev.endTimestamp).toISOString(),
      color: (ev.type.id == 2) ? 'limegreen' : ((ev.type.id == 3) ? 'red' : 'blueviolet'),
      name: ev.name,
      location: ev.location,
      organizer: ev.organizer,
      tags: ev.tags,
      description: ev.description,
      coordinates: ev.coordinates,
      attendees: ev.attendees,
      beginning: ev.beginningTimestamp,
      ending: ev.endTimestamp,
      type: ev.type.id,
      temp: 0
    }
    api.addEvent(calendarEvent)
  })
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
        response.json().then(json => {
          console.log(json)
          addEvents(json.userAvailableEvents)
        })
      });
  }


const Welcome = () => {

  useEffect(() => {
    getEvents();
  }, [])

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [clickedEvent, setClickedEvent] = useState({});

  return (
    <div className=''>
      <Navbar />
      <LeftPanel calendarRef={calendarRef}/>
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
        eventClick={function(info) {
          setClickedEvent(info.event)
          setOpen(true)
        }}
      />
      <Popup class="popup-overlay" open={open} position="center center" closeOnDocumentClick={0}>
        <EventInfo close={closeModal} info={clickedEvent} calendarRef={calendarRef}/>
      </Popup>
    </div>
  )
}

export default Welcome;