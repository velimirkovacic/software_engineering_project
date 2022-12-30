import React, { useEffect, useState } from 'react';
import { ReactSession } from 'react-client-session'
import AsyncSelect from 'react-select/async';

const EventInfo = (props) => {

    const initialState = {name: props.info.extendedProps.name, location: props.info.extendedProps.location,
        beginningTimestamp: props.info.extendedProps.beginning, endTimestamp:props.info.extendedProps.ending,
        description: props.info.extendedProps.description, promoted: props.info.extendedProps.promoted,
        coordinates: props.info.extendedProps.coordinates}
        
    const [details, setDetails] = useState(initialState)
    const [error, setError] = useState('');

    const [editOrganizer, setEditOrg] = useState(false)
    const [editModerator, setEditMod] = useState(false)

    const [premium, setPremium] = useState(false);

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
        checkPremium()
    }, [])

    const checkPremium = () => {
        const array = ReactSession.get('roles').map(role => role.id)
        if (array.indexOf(2) !== -1) {
            setPremium(true)
        }
    }

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

    const promoteEvent = () => {
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
        fetch('/api/events/promote', options)
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

    const editEvent = () => {
        if (details.name == '') {
            setError("Potrebno je unijeti ime eventa")
            document.getElementById('eventinfo-form').scrollTo(0, 0)
        } else if (details.location == ''){
            setError("Potrebno je unijeti mjesto eventa")
            document.getElementById('eventinfo-form').scrollTo(0, 0)
        } else if (details.coordinates == '') {
            setError("Potrebno je unijeti koordinate mjesta eventa")
            document.getElementById('eventinfo-form').scrollTo(0, 0)
        } else if (details.beginningTimestamp == '') {
            setError("Potrebno je unijeti vrijeme početka eventa")
            document.getElementById('eventinfo-form').scrollTo(0, 0)
        } else if (details.endTimestamp == '') {
            setError("Potrebno je unijeti vrijeme kraja eventa")
            document.getElementById('eventinfo-form').scrollTo(0, 0)
        } else if (details.description == '') {
            setError("Potrebno je unijeti opis eventa")
            document.getElementById('eventinfo-form').scrollTo(0, 0)
        } else if(new Date(details.beginningTimestamp).getTime() > new Date(details.endTimestamp).getTime()){
            setError("Unijeli ste da event završava prije nego što počinje")
            document.getElementById('eventinfo-form').scrollTo(0, 0)
        } else if (new Date(details.beginningTimestamp).getTime() < new Date().getTime()) {
            setError("Ne možete stvoriti event u prošlosti")
            document.getElementById('eventinfo-form').scrollTo(0, 0)
        } else {
            const data = {
                eventId: props.info.id,
                tagIds: selectValue.map(tag => tag.value),
                name: details.name,
                location: details.location,
                beginningTimestamp: Date.parse(details.beginningTimestamp),
                endTimestamp: Date.parse(details.endTimestamp),
                description: details.description,
                typeId: props.info.extendedProps.type,
                promoted: (details.promoted == true) ? true : false,
                coordinates: details.coordinates
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(data)
            };
            console.log(data)
            fetch('/api/events/edit', options)
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        response.json().then(json => {
                            console.log(json)
                            props.close()
                            window.location.reload()
                        })
                    } else {
                        setError("Pogreška pri unosu")
                        document.getElementById('eventinfo-form').scrollTo(0, 0)           
                    }
                })
        }
    }

    return (
        <form>
            <div className='form-inner2' id='eventinfo-form'>
                <h2>{props.info.title}</h2>
                <div className='form-group' name='eventinfo-form'>
                    {(error !== '') ? (<div className='errors'>{error}</div>) : ''}

                    {(editOrganizer == true) ? 
                    (<div><label>Naziv događaja: </label>
                    <input type='text' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/></div>) : 
                    (<div><label>Naziv događaja: <span style={{ color: 'black' }}>{props.info.extendedProps.name}</span></label>
                    <label>Organizator: <span style={{ color: 'black' }}>{(props.info.extendedProps.organizer.nickname != '') ? (props.info.extendedProps.organizer.nickname) : (props.info.extendedProps.organizer.username)}</span></label></div>)}


                    {(editOrganizer == true || editModerator == true) ?
                    (<div><label>Oznake: </label><AsyncSelect styles={customStyles} isMulti defaultOptions placeholder={"Uredite oznake..."} onChange={e => (handleItemSelectChange(e))} loadOptions={getTags} cacheOptions value={selectValue}/></div>) : 
                    (<label>Oznake: {props.info.extendedProps.tags.map((tag) =>  <span className="flex-item-tag" style={{background: tag.hexColor, marginRight:'5px'}}>{tag.name}</span>)}</label>)}
                    
                    {(editOrganizer == true) ? 
                    (<div>
                        <label>Mjesto događaja: </label>
                        <input type='text' onChange={e => setDetails({...details, location:e.target.value})} value={details.location}/>
                        <label>Koordinate: </label>
                        <input type='text' onChange={e => setDetails({...details, coordinates:e.target.value})} value={details.coordinates}/>
                        <label>Vrijeme početka: </label>
                        <input type='datetime-local' onChange={e => setDetails({...details, beginningTimestamp:e.target.value})} value={details.beginningTimestamp}/>
                        <label>Vrijeme završetka: </label>
                        <input type='datetime-local' onChange={e => setDetails({...details, endTimestamp:e.target.value})} value={details.endTimestamp}/>
                        <label>Opis događaja: </label>
                        <textarea type='text' onChange={e => setDetails({...details, description:e.target.value})} value={details.description}/>
                    </div>) : 
                    (<div>
                        <label>Mjesto događaja: <span style={{ color: 'black' }}>{props.info.extendedProps.location}</span></label>
                        <label>Koordinate: <span style={{ color: 'black' }}>{props.info.extendedProps.coordinates}</span></label>
                        <label>Vrijeme početka: <span style={{ color: 'black' }}>{new Date(props.info.extendedProps.beginning).toLocaleString('hr', {dateStyle: 'short', timeStyle: 'short'})}</span></label>
                        <label>Vrijeme završetka: <span style={{ color: 'black' }}>{new Date(props.info.extendedProps.ending).toLocaleString('hr', {dateStyle: 'short', timeStyle: 'short'})}</span></label>
                        <label>Opis događaja: <span style={{ color: 'black' }}>{props.info.extendedProps.description}</span></label>
                        {(props.info.extendedProps.type != 1) ? (<label>Popis dolaznika: {props.info.extendedProps.attendees.map((at) => <span className="flex-item-tag" style={{color: 'black', background:'lightgrey', marginRight:'5px', marginTop:'3px'}}>{(at.nickname != '') ? (at.nickname) : (at.username)}</span>)}</label>) : ('')}
                    </div>)}

                </div>
                {(editOrganizer != true && editModerator != true && props.info.extendedProps.temp == 1) ? <button type='button' name='register' onClick={() => signUpForEvent()}>Prijavi se</button> : ''}
                {(editOrganizer != true && editModerator != true && upcoming == true && props.info.extendedProps.temp == 0 && props.info.extendedProps.type != 1) ? <button type='button' name='register' onClick={() => unsignForEvent()}>Odjavi se</button> : ''}
                
                {(editOrganizer != true && editModerator != true) ? (<button type='button' name='register' onClick={() => props.close()}>Odustani</button>) : ('')}
                
                {(editOrganizer != true && editModerator != true && props.info.extendedProps.temp == 1) ? (<button type='button' name='register' onClick={() => removeFromCalendar()}>Ukloni</button>) : ''}
                {(props.info.extendedProps.organizer.username == ReactSession.get('username') && editOrganizer == false && upcoming == true) ? (<button type='button' name='moderator' onClick={() => setEditOrg(true)}>Uredi</button>) : ''}
                {(moderator == true && props.info.extendedProps.organizer.username != ReactSession.get('username') && editModerator == false && upcoming == true) ? (<button type='button' name='moderator' onClick={() => setEditMod(true)}>Uredi</button>) : ''}
                
                {(editOrganizer == true) ? (<button type='button' name='register' onClick={() => {setEditOrg(false); setError(''); setDetails(initialState)}}>Odbaci</button>) : ('')}
                {(editModerator == true) ? (<button type='button' name='register' onClick={() => {setEditMod(false); setError(''); setDetails(initialState)}}>Odbaci</button>) : ('')}
                {(editOrganizer == true) ? (<button type='button' name='moderator' onClick={() => editEvent()}>Spremi promjene</button>) : ''}
                {(editModerator == true) ? (<button type='button' name='moderator' onClick={() => editTags()}>Spremi promjene</button>) : ''}
                
                {(editOrganizer != true && editModerator != true && (moderator == true || props.info.extendedProps.organizer.username == ReactSession.get('username'))) ? (<button type='button' name='moderator' onClick={() => removeEvent()}>Obriši</button>) : ''}
                {(editOrganizer != true && upcoming == true && premium == true && details.promoted == false) ? (<button type='button' name='premium' onClick={() => promoteEvent()}>Promoviraj</button>) : ''}
            </div>
        </form>
    )
}

export default EventInfo;