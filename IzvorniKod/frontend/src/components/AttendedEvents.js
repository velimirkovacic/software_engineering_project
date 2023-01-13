import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';


function AttendedEvents() {

    useEffect(() => {
        getAttendedEvents()
    }, [])

    const [attendedEvents, setAttended] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [reviews, setReviews] = useState([])
    const [eventIds, setEventIds] = useState([])

    const changeReviewState = (id, review) => {
        const helpArray = reviews.slice()
        helpArray[eventIds.indexOf(id)] = review
        setReviews(helpArray)
    }

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
                    const helpArray2 = []
                    json.userAvailableEvents.map(ev => helpArray2.push(ev.review))
                    setReviews(helpArray2)
                    const helpArray3 = []
                    json.userAvailableEvents.map(ev => helpArray3.push(ev.id))
                    setEventIds(helpArray3)
                    setLoaded(true)
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
        fetch('/api/events/review', options)
    }

    return (
        <div>
            <Navbar />
            <div>
                <div style={{ margin: 'auto', width: '80%' }}>
                    <h2 style={{ marginLeft: "10px", marginTop: "20px", marginBottom: '20px' }}>Pohađani eventi:</h2>
                    {(attendedEvents.length > 0) ? (attendedEvents.map(ev =>
                        <div key={ev.id} className='attended'>
                            <div className='event'>
                                <h3 style={{ marginBottom: '5px', marginLeft: '5%', marginTop: '10px' }}>{'[' + ev.location + '] ' + ev.name}</h3>
                                <div style={{ fontSize: '10pt', marginLeft: '5%' }}>{ev.organizer.nickname}<span style={{color: 'grey'}}>{' @' + ev.organizer.username}</span></div>
                                <div style={{ fontSize: '10pt', marginLeft: '5%', marginBottom: '10px' }}>{new Date(ev.beginningTimestamp).toLocaleString('hr', { dateStyle: 'short', timeStyle: 'short' })}</div>
                            </div>
                                {(reviews[eventIds.indexOf(ev.id)] == 0 && ev.type.id == 3) ? (
                                    <div className='likes'>
                                    <button name='registerGrey' style={{ width: '120px', height: '30px' }} onClick={() => {reviewEvent(ev.id, 1); changeReviewState(ev.id, 1)}}> Sviđa mi se</button>
                                    <button name='dislikeGrey' style={{ width: '120px', height: '30px' }} onClick={() => {reviewEvent(ev.id, -1); changeReviewState(ev.id, -1)}}> Ne sviđa mi se</button>
                                    </div>
                                ) : ('')}
                                {(reviews[eventIds.indexOf(ev.id)] == 1 && ev.type.id == 3) ? (
                                    <div className='likes'>
                                    <button name='register' style={{ width: '120px', height: '30px' }} onClick={() => {reviewEvent(ev.id, 0); changeReviewState(ev.id, 0)}}> Sviđa mi se</button>
                                    <button name='dislikeGrey' style={{ width: '120px', height: '30px' }} onClick={() => {reviewEvent(ev.id, -1); changeReviewState(ev.id, -1)}}> Ne sviđa mi se</button>
                                    </div>
                                ) : ('')}
                                {(reviews[eventIds.indexOf(ev.id)] == -1 && ev.type.id == 3) ? (
                                    <div className='likes'>
                                    <button name='registerGrey' style={{ width: '120px', height: '30px' }} onClick={() => {reviewEvent(ev.id, 1); changeReviewState(ev.id, 1)}}> Sviđa mi se</button>
                                    <button name='dislike' style={{ width: '120px', height: '30px' }} onClick={() => {reviewEvent(ev.id, 0); changeReviewState(ev.id, 0)}}> Ne sviđa mi se</button>
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
            <div style={{marginBottom: '5vh'}}></div>
        </div>
    );
}

export default AttendedEvents;