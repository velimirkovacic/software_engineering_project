import React, { useEffect, useState } from 'react';
import { ReactSession } from 'react-client-session'
import AsyncSelect from 'react-select/async';

const EventInfo = (props) => {

    const [moderator, setModerator] = useState(false);
    const checkModerator = () => {
        const array = ReactSession.get('roles').map(role => role.id)
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
                        props.close()
                        window.location.reload()
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
                        props.close()
                        window.location.reload()
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
                        props.close()
                        window.location.reload()
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

    const getTags = (inputValue, callback) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/tags', options)
            .then(response => {
              response.json().then(json => {
                console.log(json)
                let tagOpt = []
                let tagOptDefault =[]
                json.tags.map(tag => {
                    let tagOption = {
                        value: tag.id, 
                        label: tag.name
                    }
                    tagOpt.push(tagOption)
                })
                for (let i = 0; i < tagOpt.length; i++) {
                    for (let j = 0; j < props.info.extendedProps.tags.length; j++) {
                        if (tagOpt[i].value == props.info.extendedProps.tags[j].id) {
                            tagOptDefault.push(tagOpt[i])
                        }
                    }
                }
                callback(tagOpt)
                if (tagOptDefault.length > 0) {setSelectValue(tagOptDefault)}
            })
        })
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            background: '#e8f0fe',
            borderRadius: '8px',
            borderColor: 'white',
            fontSize: '12px'
        })
    }

    const [selectValue, setSelectValue] = useState('')

    const handleItemSelectChange = (options) => {
        setSelectValue(options)
    }

    const editTags = () => {
        const data = {
            eventId: props.info.id,
            tagIds: selectValue.map(tag => tag.value)
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/events/edittag', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        props.close()
                        window.location.reload()
                    })
                }
            })
    }


    return (
        <form>
            <div className='form-inner2'>
                <h2>{props.info.title}</h2>
                <div className='form-group' name='eventinfo-form'>
                    <label>Naziv događaja: <span style={{ color: 'black' }}>{props.info.extendedProps.name}</span></label>
                    <label>Organizator: <span style={{ color: 'black' }}>{(props.info.extendedProps.organizer.nickname != '') ? (props.info.extendedProps.organizer.nickname) : (props.info.extendedProps.organizer.username)}</span></label>

                    {(moderator != true) ? (<label>Oznake: {props.info.extendedProps.tags.map((tag) =>  <span className="flex-item-tag" style={{background: tag.hexColor, marginRight:'5px'}}>{tag.name}</span>)}</label>) : 
                    (<AsyncSelect styles={customStyles} isMulti defaultOptions placeholder={"Uredite oznake..."} onChange={e => (handleItemSelectChange(e))} loadOptions={getTags} cacheOptions value={selectValue}/>)}
                    

                    <label>Mjesto događaja: <span style={{ color: 'black' }}>{props.info.extendedProps.location}</span></label>
                    <label>Koordinate: <span style={{ color: 'black' }}>{props.info.extendedProps.coordinates}</span></label>
                    <label>Vrijeme početka: <span style={{ color: 'black' }}>{new Date(props.info.extendedProps.beginning).toLocaleString('hr', {dateStyle: 'short', timeStyle: 'short'})}</span></label>
                    <label>Vrijeme završetka: <span style={{ color: 'black' }}>{new Date(props.info.extendedProps.ending).toLocaleString('hr', {dateStyle: 'short', timeStyle: 'short'})}</span></label>
                    <label>Opis događaja: <span style={{ color: 'black' }}>{props.info.extendedProps.description}</span></label>
                    {(props.info.extendedProps.type != 1) ? (<label>Popis dolaznika: {props.info.extendedProps.attendees.map((at) => <span className="flex-item-tag" style={{color: 'black', background:'lightgrey', marginRight:'5px'}}>{(at.nickname != '') ? (at.nickname) : (at.username)}</span>)}</label>) : ('')}
                </div>
                {(props.info.extendedProps.temp == 1) ? <button type='button' name='register' onClick={() => signUpForEvent()}>Prijavi se</button> : ''}
                {(upcoming == true && props.info.extendedProps.temp == 0 && props.info.extendedProps.type != 1) ? <button type='button' name='register' onClick={() => unsignForEvent()}>Odjavi se</button> : ''}
                <button type='button' name='register' onClick={() => props.close()}>Odustani</button>
                {(props.info.extendedProps.temp == 1) ? (<button type='button' name='register' onClick={() => removeFromCalendar()}>Ukloni</button>) : ''}
                {(moderator == true) ? (<button type='button' name='moderator' onClick={() => editTags()}>Uredi oznake</button>) : ''}
                {(moderator == true || props.info.extendedProps.organizer.username == ReactSession.get('username')) ? (<button type='button' name='moderator' onClick={() => removeEvent()}>Obriši</button>) : ''}
            </div>
        </form>
    )
}

export default EventInfo;