import React, { useEffect } from 'react'
import { useState } from 'react'
import AsyncSelect from 'react-select/async';



const customStyles = {
    control: (base) => ({
        ...base,
        background: '#e8f0fe',
        borderRadius: '8px',
        borderColor: 'white',
        fontSize: '12px'
    }),
    option: (base) => ({
        ...base,
        borderBottom: '2px solid #e8f0fe'
    })
}


function RightPanel(props) {
    const [selected, setSelected] = useState('')
    const [events, setEvents] = useState('')
    const eventList = []

    const getPublicEvents = (inputValue, callback) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/events/signup', options)
            .then(response => {
              response.json().then(json => {
                console.log(json)
                json.userAvailableEvents.map(ev => eventList.push(ev))
                setEvents(eventList)
                let eventOpt = []
                json.userAvailableEvents.map(ev => {
                    let publicEvent = {
                        value: ev.id, 
                        label: '[' + ev.location + '] ' + ev.name,
                        organizer: ev.organizer.username,
                        time: new Date(ev.beginningTimestamp).toLocaleString('hr', {dateStyle: 'short', timeStyle: 'short'}),
                        color: (ev.type.id == 3) ? 'red' : 'limegreen'
                    }
                    eventOpt.push(publicEvent)
                })
                callback(eventOpt)
            })
        })
    }

    const formatOptionLabel = ({value, label, organizer, time, color}) => (
        <div>
            <div style={{marginBottom: '5px', color: color}}>{label}</div>
            <div style={{fontSize: '10pt'}}>{organizer}</div>
            <div style={{fontSize: '10pt'}}>{time}</div>
        </div>
    )

    const onSelectEvent = () => {
        let helpList = []
        for (let i = 0; i < events.length; i++) {
            if (events[i].id == selected) {
                helpList.push(events[i])
            }
        }
        props.addEvents(helpList, 1)
    }

    useEffect(() => {
        onSelectEvent();
    }, [selected])


    return (
        <div className='outerRight'>
            <div className='innerRight'>
                <h2>Dostupni eventovi</h2>
                <div style={{width: '85%'}}>
                    <AsyncSelect styles={customStyles} placeholder={"Odaberite događaj..."} 
                    onChange={e => setSelected(e.value)} loadOptions={getPublicEvents} cacheOptions defaultOptions
                    formatOptionLabel={formatOptionLabel}/>
                </div>
            </div>
        </div>
    )
}

export default RightPanel