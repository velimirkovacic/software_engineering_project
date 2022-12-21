import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';


function AttendedEvents() {

    useEffect(() => {
        getAttendedEvents()
    }, [])

    const [attendedEvents, setAttended] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getAttendedEvents = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/events/attended', options)
            .then(response => {
                response.json().then(json => {
                    console.log(json)
                    const helpArray = []
                    json.userAvailableEvents.map(ev => helpArray.push(ev))
                    setAttended(helpArray)
                    setLoaded(true)
                })
            })
    }
    function reviewEvent(eventId, grade, eventName) {
        const data = {
            eventId: eventId,
            review: grade
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/events/review', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                    })
                }
            })
        if (grade === 1) {
            alert("Označili ste event " + eventName + ' sa \'Sviđa mi se\'')
        }
        if (grade === -1) {
            alert("Označili ste event " + eventName + ' sa \'Ne sviđa mi se\'')
        }

    }

    return (
        <body>
            <Navbar />
            <div>
                <div style={{ margin: 'auto', width: '80%' }}>
                    <h2 style={{ marginLeft: "10px", marginTop: "20px" }}>Pohađani eventi:</h2>
                    {(attendedEvents.length > 0) ? (attendedEvents.map(ev =>
                        <div key={ev.id} className='attended'>
                            <div className='event'>
                                <h3 style={{ marginBottom: '5px', marginLeft: '5%', marginTop: '10px' }}>{'[' + ev.location + '] ' + ev.name}</h3>
                                <div style={{ fontSize: '10pt', marginLeft: '5%' }}>{(ev.organizer.nickname != '') ? (ev.organizer.nickname) : (ev.organizer.username)}</div>
                                <div style={{ fontSize: '10pt', marginLeft: '5%', marginBottom: '10px' }}>{new Date(ev.beginningTimestamp).toLocaleString('hr', { dateStyle: 'short', timeStyle: 'short' })}</div>
                            </div>
                            <div className='likes'>
                                <button type='submit' name='register' style={{ width: '120px' }} onClick={() => reviewEvent(ev.id, 1)}> Sviđa mi se</button>
                                <button name='dislike' onClick={() => reviewEvent(ev.id, -1)}> Ne sviđa mi se</button></div>
                        </div>)) : ('')}
                    {(attendedEvents.length == 0 && loaded == true) ? (
                        <div>
                            <h3 style={{ marginBottom: '5px', marginLeft: '5%', marginTop: '10px' }}>Nemate pohađanih eventova</h3>
                        </div>
                    ) : ('')}
                </div>
            </div>
        </body >
    );
}

export default AttendedEvents;