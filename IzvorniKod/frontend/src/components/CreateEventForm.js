import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {ReactSession} from 'react-client-session'

const CreateEventForm = (props) => {

    const [details, setDetails] = useState({name:'', location:'', beginningTimestamp:'', endTimestamp:'', description:'', typeId:'', tagIds:'', promoted:'', coordinates:''});
    
    const [error, setError] = useState("");

    const [premium, setPremium] = useState(false);

    const typeOptions = [
        { value: '1', label: 'Obveza' },
        { value: '2', label: 'Privatni događaj' },
        { value: '3', label: 'Javni događaj' }
    ];

    const tagOptions = [
        { value: '1', label: 'Kava' },
        { value: '2', label: 'Piva' },
    ];

    const customStyles = {
        control: (base) => ({
            ...base,
            background: '#e8f0fe',
            borderRadius: '8px',
            borderColor: 'white',
            fontSize: '12px'
        })
    }

    const checkPremium = () => {
        const array = [2] //ReactSession.get('roles')
        if (array.indexOf(2) !== -1) {
            setPremium(true)
        }
    }

    const addEvent = ()=> {
        const api = props.calendarRef.current.getApi();
        let tagArray = []
        for (let i = 0; i < details.tagIds.length; i++) {
            tagArray.push({name: details.tagIds[i].label})
        }
        const calendarEvent = {
            title: '[' + details.location + '] ' + details.name,
            start: new Date(details.beginningTimestamp).toISOString(),
            end: new Date(details.endTimestamp).toISOString(),
            color: (details.typeId == 2) ? 'limegreen' : ((details.typeId == 3) ? 'red' : 'blueviolet'),
            name: details.name,
            location: details.location,
            organizer: {username: ReactSession.get('username')},
            tags: tagArray,
            description: details.description,
            coordinates: details.coordinates,
            attendees: [],
            beginning: details.beginningTimestamp,
            ending: details.endTimestamp,
        }
        api.addEvent(calendarEvent)
    }

    useEffect(() => {
        checkPremium()
    }, [])
    
    const handleCreateEventForm = e => {
        e.preventDefault();
        let tags = ''
        if (details.tagIds != '') {
            tags = details.tagIds.map(item => parseInt(item.value))
        }
        const data = {
            name: details.name,
            location: details.location,
            beginningTimestamp: Date.parse(details.beginningTimestamp),
            endTimestamp: Date.parse(details.endTimestamp),
            description: details.description,
            typeId: parseInt(details.typeId.value),
            tagIds: tags,
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
        fetch('/api/events/add', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        props.close()
                        addEvent()
                    })
                } else {
                    setError("Pogreška pri unosu")                 
                }
            })
    }

    return (           
        <form onSubmit={handleCreateEventForm}>
            <div className='form-inner'>
                <h2>Dodaj u kalendar</h2>
                {(error !== '') ? (<div className='errors'>{error}</div>) : ''}
                <div className='form-group' name='event-form'>
                    <label htmlFor='name'>Naziv događaja: </label>
                    <input type='text' name='name' id='name' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/>
                    <label htmlFor='location'>Mjesto događaja: </label>
                    <input type='text' name='location' id='location' onChange={e => setDetails({...details, location:e.target.value})} value={details.location}/>
                    <label htmlFor='beginningTimestamp'>Datum i vrijeme početka: </label>
                    <input type='datetime-local' name='beginningTimestamp' id='beginningTimestamp' onChange={e => setDetails({...details, beginningTimestamp:e.target.value})} value={details.beginningTimestamp}/>
                    <label htmlFor='endTimestamp'>Datum i vrijeme završetka: </label>
                    <input type='datetime-local' name='endTimestamp' id='endTimestamp' onChange={e => setDetails({...details, endTimestamp:e.target.value})} value={details.endTimestamp}/>
                    <label htmlFor='typeId'>Vrsta događaja: </label>
                    <Select styles={customStyles} options={typeOptions} placeholder={"Odaberite vrstu događaja..."} onChange={e => setDetails({...details, typeId:e})} value={details.typeId} />
                    <label htmlFor='tagId'>Oznake događaja: </label>
                    <Select styles={customStyles} options={tagOptions} isMulti placeholder={"Odaberite oznake..."} onChange={e => setDetails({...details, tagIds:e})} value={details.tagIds} />
                    <label htmlFor='description'>Opis događaja: </label>
                    <textarea type='text' name='description' id='description' onChange={e => setDetails({...details, description:e.target.value})} value={details.description}/>
                    <label htmlFor='coordinates'>Koordinate mjesta događaja: </label>
                    <input type='text' name='coordinates' id='coordinates' onChange={e => setDetails({...details, coordinates:e.target.value})} value={details.coordinates}/>
                </div>
                <button type='submit' name='register'>Dodaj događaj</button>
                <button type='button' name='register' onClick={() => props.close()}>Odustani</button>
                {(details.typeId.value == '2') ? (<button type='button' name='friends'>Pozovi prijatelje</button>) : ''}
                {(premium == true && details.promoted == '' && details.typeId.value == '3') ? (<button type='button' name='premium' onClick={() => setDetails({...details, promoted: true})}>Promoviraj</button>) : ''}
            </div>
        </form>
  )
}

export default CreateEventForm;