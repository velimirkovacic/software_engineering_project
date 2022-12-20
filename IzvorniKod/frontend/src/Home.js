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

const addEvents = (events, temp) => {
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
      temp: temp
    }
    api.addEvent(calendarEvent)
  })
}

const removeAllEvents = () => {
  const api = calendarRef.current.getApi();
  api.removeAllEvents()
}

const getEvents = () => {
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/JSON'
      }
  };
  fetch('/api/events/calendar', options)
      .then(response => {
        response.json().then(json => {
          console.log(json)
          addEvents(json.userAvailableEvents, 0)
        })
      });
}


const Welcome = () => {

  useEffect(() => {
    removeAllEvents()
    getEvents();
  }, [])

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [clickedEvent, setClickedEvent] = useState({});

  return (
    <div className=''>
      <Navbar />
      <LeftPanel />
      <RightPanel addEvents={addEvents}/>
      <div className='calendar'>
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
      </div>
      <Popup class="popup-overlay" open={open} position="center center" closeOnDocumentClick={0}>
        <EventInfo close={closeModal} info={clickedEvent} calendarRef={calendarRef} />
      </Popup>
    </div>
  )
}

export default Welcome;