import React, { useEffect } from 'react'
import { useState } from 'react'
import Dropdown from './Dropdown'
import AsyncSelect from 'react-select/async';



const customStyles = {
    control: (base) => ({
        ...base,
        background: '#e8f0fe',
        borderRadius: '8px',
        borderColor: 'white',
        fontSize: '12px'
    })
}


function RightPanel() {
    const [selectedOption, setSelectedOption] = useState(0)

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
                let eventOpt = []
                json.userAvailableEvents.map(ev => {
                    let publicEvent = {
                        value: ev.id, 
                        label: ev.name + '(' + ev.organizer.username + ')'
                    }
                    eventOpt.push(publicEvent)
                })
                callback(eventOpt)
            })
        })
    }


    //const [selected, setSelected] = useState("Izbornik");
    return (
        <div className='outerRight'>
            <div className='innerRight'>
                <h2>Javni eventi</h2>
                <div style={{width: '80%'}}>
                    <AsyncSelect styles={customStyles} placeholder={"Odaberite događaj..."} 
                    onChange={e => setSelectedOption(e.value)} loadOptions={getPublicEvents} cacheOptions defaultOptions />
                </div>
            </div>
        </div>
    )
}

export default RightPanel