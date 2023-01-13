import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Navbar from './components/Navbar';
import EventInfo from './components/EventInfo'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import hrLocale from '@fullcalendar/core/locales/hr'
import Popup from 'reactjs-popup';


const Welcome = () => {

  const navigate = useNavigate();

  let calendarRef = React.createRef()

  const addEvents = (events, temp) => {
    const api = calendarRef.current.getApi();
    events.map((ev) => {
      let calendarEvent = {
        id: ev.id,
        title: '[' + ev.location + '] ' + ev.name,
        start: new Date(ev.beginningTimestamp).toISOString(),
        end: new Date(ev.endTimestamp).toISOString(),
        color: (ev.type.id == 2) ? '#40b5ad' : ((ev.type.id == 3) ? '#05457c' : '#6f8faf'),
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
        promoted: ev.promoted,
        temp: temp
      }
      if (api.getEventById(ev.id) == null) {
        api.addEvent(calendarEvent)
      }
    })
  }

  const currentTime = () => {
    const time = new Date()
    let hours = time.getHours()
    if (hours == 1) {
      hours = hours - 1
    } else if (hours > 1) {
      hours = hours - 2
    }
    if (hours < 10) {hours = '0' + hours}
    return hours + ':00:00'
  }

  const height = window.innerHeight * 0.85

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
          if (response.ok) {
            response.json().then(json => {
              console.log(json)
              addEvents(json.userAvailableEvents, 0)
            })
          } else {
            ReactSession.set("isLoggedIn", "false");
            navigate('/login')
          }
        });
  }

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
      <LeftPanel addEvents={addEvents}/>
      <RightPanel addEvents={addEvents}/>
      <div className='calendar'>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin]}
          initialView='timeGridWeek'
          allDaySlot={false}
          scrollTime={currentTime()}
          scrollTimeReset={false}
          height={height}
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