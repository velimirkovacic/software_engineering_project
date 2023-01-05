import React, {useState, useEffect} from 'react'
import Popup from 'reactjs-popup'

import CreateEventForm from './CreateEventForm'

function LeftPanel(props) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const [active, setActive] = useState([]);
    const [promotedEvents, setPromoted] = useState([]);

    useEffect(() => {
        fetch('/api/user/top')
            .then(data => data.json())
            .then(active => {
                setActive(active.usernames)
                console.log(active)
            })
        getPromotedEvents()
    }, []);

    var aktivni = [];
    active.forEach(e=>aktivni.push(e));

    const getPromotedEvents = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/events/promoted', options)
            .then(response => {
              response.json().then(json => {
                console.log(json)
                const helpArray = []
                json.userAvailableEvents.map(ev => helpArray.push(ev))
                setPromoted(helpArray)
            })
        })
    }

    const onSelectEvent = (id) => {
        let helpList = []
        for (let i = 0; i < promotedEvents.length; i++) {
            if (promotedEvents[i].id == id) {
                helpList.push(promotedEvents[i])
            }
        }
        props.addEvents(helpList, 1)
    }

    return (
        <div className='outerLeft'>
            <div className='inner'>
                <button className='btnAdd' onClick={() => setOpen(true)}>Dodaj u kalendar</button>
            </div>
            <div className='inner'>
                <div className='activeUsers'>
                    <h3 style={{marginLeft: '5%', marginBottom: '5px'}}>Aktivni korisnici</h3>
                    {(aktivni[0]!=null) ? (<h4 style={{marginLeft: '5%'}}>1. {aktivni[0]}</h4>) : ('')}
                    {(aktivni[1]!=null) ? (<h4 style={{marginLeft: '5%'}}>2. {aktivni[1]}</h4>) : ('')}
                    {(aktivni[2]!=null) ? (<h4 style={{marginLeft: '5%'}}>3. {aktivni[2]}</h4>) : ('')}
                </div>
                <div className='container'></div>
                <div className='promoEvents'>
                    <h3 style={{marginLeft: '5%', marginBottom: '5px'}}>Istaknuti eventi</h3>
                    {(promotedEvents.length > 0) ? (promotedEvents.map(ev =>
                            <button key={ev.id} onClick={() => onSelectEvent(ev.id)} className='btnPromoEvents'>
                                <h3 style={{marginBottom: '5px', marginLeft: '5%', marginTop: '10px'}}>{'[' + ev.location + '] ' + ev.name}</h3>
                                <div style={{fontSize: '10pt', marginLeft: '5%', marginBottom: '5px'}}>{ev.organizer.nickname}<span style={{color: 'grey'}}>{' @' + ev.organizer.username}</span>{' [' + ev.organizer.score + ']'}</div>
                                <div style={{fontSize: '10pt', marginLeft: '5%', marginBottom: '10px'}}>{new Date(ev.beginningTimestamp).toLocaleString('hr', {dateStyle: 'short', timeStyle: 'short'})}</div>
                            </button>)) : ('')}
                </div>
            </div>
            <Popup class="popup-overlay" open={open} position="center center" closeOnDocumentClick={0}>
                <CreateEventForm close={closeModal} />
            </Popup>

        </div>
    )
}

export default LeftPanel