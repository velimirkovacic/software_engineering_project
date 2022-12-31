import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';


function AttendedEvents() {

    useEffect(() => {
        getAttendedEvents()
    }, [])

    const [attendedEvents, setAttended] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [disable, setDisable] = useState(false)

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
                    setDisable(false)
                })
            })
    }
    function reviewEvent(eventId, grade) {
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
        setDisable(true)
        fetch('/api/events/review', options)
            .then(response => {
                getAttendedEvents()
            })
    }

    return (
        <div>
            <Navbar />
            <div>
                <div style={{ margin: 'auto', width: '80%' }}>
                    <h2 style={{ marginLeft: "10px", marginTop: "20px" }}>Pohađani eventi:</h2>
                    {(attendedEvents.length > 0) ? (attendedEvents.map(ev =>
                        <div key={ev.id} className='attended'>
                            <div className='event'>
                                <h3 style={{ marginBottom: '5px', marginLeft: '5%', marginTop: '10px' }}>{'[' + ev.location + '] ' + ev.name}</h3>
                                <div style={{ fontSize: '10pt', marginLeft: '5%' }}>{(ev.organizer.nickname != '') ? (ev.organizer.nickname + ' (' + ev.organizer.score + ')') : (ev.organizer.username + ' (' + ev.organizer.score + ')')}</div>
                                <div style={{ fontSize: '10pt', marginLeft: '5%', marginBottom: '10px' }}>{new Date(ev.beginningTimestamp).toLocaleString('hr', { dateStyle: 'short', timeStyle: 'short' })}</div>
                            </div>
                                {(ev.review == 0) ? (
                                    <div className='likes'>
                                    <button disabled={disable} name='registerGrey' style={{ width: '120px', height: '30px' }} onClick={e => {reviewEvent(ev.id, 1); e.target.name='register'}}> Sviđa mi se</button>
                                    <button disabled={disable} name='dislikeGrey' style={{ width: '120px', height: '30px' }} onClick={e => {reviewEvent(ev.id, -1); e.target.name='dislike' }}> Ne sviđa mi se</button>
                                    </div>
                                ) : ('')}
                                {(ev.review == 1) ? (
                                    <div className='likes'>
                                    <button disabled={disable} id={ev.id + 0.1} name='register' style={{ width: '120px', height: '30px' }} onClick={e => {reviewEvent(ev.id, 0); e.target.name='registerGrey'}}> Sviđa mi se</button>
                                    <button disabled={disable} name='dislikeGrey' style={{ width: '120px', height: '30px' }} onClick={e => {reviewEvent(ev.id, -1); e.target.name='dislike'; document.getElementById(ev.id + 0.1).name='registerGrey' }}> Ne sviđa mi se</button>
                                    </div>
                                ) : ('')}
                                {(ev.review == -1) ? (
                                    <div className='likes'>
                                    <button disabled={disable} name='registerGrey' style={{ width: '120px', height: '30px' }} onClick={e => {reviewEvent(ev.id, 1); e.target.name='register'; document.getElementById(ev.id + 0.2).name='dislikeGrey'  }}> Sviđa mi se</button>
                                    <button disabled={disable} id={ev.id + 0.2} name='dislike' style={{ width: '120px', height: '30px' }} onClick={e => {reviewEvent(ev.id, 0); e.target.name='dislikeGrey' }}> Ne sviđa mi se</button>
                                    </div>
                                ) : ('')}

                        </div>)) : ('')}
                    {(attendedEvents.length == 0 && loaded == true) ? (
                        <div>
                            <h3 style={{ marginBottom: '5px', marginLeft: '5%', marginTop: '10px' }}>Nemate pohađanih eventova</h3>
                        </div>
                    ) : ('')}
                </div>
            </div>
        </div>
    );
}

export default AttendedEvents;