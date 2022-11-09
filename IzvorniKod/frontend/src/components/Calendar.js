import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import hrLocale from '@fullcalendar/core/locales/hr'

//prop events je polje objekata, svaki objekt treba imati title, color, start i end (datumi u obliku ISO8601 stringa)
//treba nadograditi funkciju za eventClick


function Calendar(props) {
    return (
        <FullCalendar
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

        events={props.events}
        eventClick={function(info) {
            alert('Event: ' + info.event.title);
        }}
        />
    );
  }
  
  export default Calendar;