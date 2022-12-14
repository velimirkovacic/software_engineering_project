import React, {useEffect, useState} from 'react';
import {ReactSession} from 'react-client-session'

const EventInfo = (props) => {

    const [moderator, setModerator] = useState(false);
    const checkModerator = () => {
        const array = [3] //ReactSession.get('roles')
        if (array.indexOf(3) !== -1) {
            setModerator(true)
        }
    }
    useEffect(() => {
        checkModerator()
        checkDate()
    }, [])

    const [upcoming, setUpcoming] = useState(false);
    const today = new Date()
    const checkDate = () => {
        (new Date(props.info.extendedProps.beginning).getTime() - today.getTime() > 0) ? setUpcoming(true) : setUpcoming(false)
    }

    const removeEvent = () => {
        const data = {
            eventId: props.info.id,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/events/delete', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        removeFromCalendar()
                    })
                }
            })
    }

    const signUpForEvent = () => {
        const data = {
            eventId: props.info.id,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/events/signup', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        singUpInCalendar()
                    })
                }
            })
    }

    const unsignForEvent = () => {
        const data = {
            eventId: props.info.id,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/events/unsign', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        removeFromCalendar()
                    })
                }
            })
    }

    const removeFromCalendar = () => {
        const api = props.calendarRef.current.getApi();
        const event = api.getEventById(props.info.id)
        event.remove()
        props.close()
    }

    const singUpInCalendar = () => {
        const api = props.calendarRef.current.getApi();
        const event = api.getEventById(props.info.id)
        event.setExtendedProp('temp', 0)
        props.close()
    }

    return (           
        <form>
            <div className='form-inner2'>
                <h2>{props.info.title}</h2>
                <div className='form-group' name='eventinfo-form'>
                    <label>Naziv događaja: <span style={{color:'black'}}>{props.info.extendedProps.name}</span></label>
                    <label>Organizator: <span style={{color:'black'}}>{props.info.extendedProps.organizer.username}</span></label>
                    <label>Oznake: {props.info.extendedProps.tags.map((tag) => <span style={{color:'black'}}>{tag.name} </span>)}</label>
                    <label>Mjesto događaja: <span style={{color:'black'}}>{props.info.extendedProps.location}</span></label>
                    <label>Koordinate: <span style={{color:'black'}}>{props.info.extendedProps.coordinates}</span></label>
                    <label>Vrijeme početka: <span style={{color:'black'}}>{new Date(props.info.extendedProps.beginning).toLocaleString('hr')}</span></label>
                    <label>Vrijeme završetka: <span style={{color:'black'}}>{new Date(props.info.extendedProps.ending).toLocaleString('hr')}</span></label>
                    <label>Opis događaja: <span style={{color:'black'}}>{props.info.extendedProps.description}</span></label>
                    {(props.info.extendedProps.type != 1) ? (<label>Popis dolaznika: {props.info.extendedProps.attendees.map((at) => <span style={{color:'black'}}>{at.username} </span>)}</label>) : ('')}
                </div>
                {(props.info.extendedProps.temp == 1) ? <button type='button' name='register' onClick={() => signUpForEvent()}>Prijavi se</button> : ''}
                {(upcoming == true && props.info.extendedProps.temp == 0) ? <button type='button' name='register' onClick={() => unsignForEvent()}>Odjavi se</button> : (<button type='button' name='register' onClick={() => props.close()}>Zatvori</button>)
                 (<button type='button' name='register' onClick={() => removeFromCalendar()}>Odustani</button>)}
                {(moderator == true && props.info.extendedProps.type == 3) ? (<button type='button' name='moderator'>Uredi oznake</button>) : ''}
                {(moderator == true) ? (<button type='button' name='moderator' onClick={() => removeEvent()}>Obriši</button>) : ''}
            </div>
        </form>
  )
}

export default EventInfo;