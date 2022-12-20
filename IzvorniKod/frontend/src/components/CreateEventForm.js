import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
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
                json.tags.map(tag => {
                    let tagOption = {
                        value: tag.id, 
                        label: tag.name
                    }
                    tagOpt.push(tagOption)
                })
                callback(tagOpt)
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

    const checkPremium = () => {
        const array = ReactSession.get('roles').map(role => role.id)
        if (array.indexOf(2) !== -1) {
            setPremium(true)
        }
    }

    useEffect(() => {
        checkPremium()
    }, [])
    
    const handleCreateEventForm = e => {
        e.preventDefault();
        let tags = []
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
                        window.location.reload()
                    })
                } else {
                    setError("Pogreška pri unosu")
                    document.getElementById('eventform').scrollTo(0, 0)           
                }
            })
    }

    return (           
        <form onSubmit={handleCreateEventForm}>
            <div className='form-inner2' id='eventform'>
                <h2>Dodaj u kalendar</h2>
                <div className='form-group' name='event-form'>
                    {(error !== '') ? (<div className='errors'>{error}</div>) : ''}
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
                    <AsyncSelect styles={customStyles} isMulti placeholder={"Odaberite oznake..."} onChange={e => setDetails({...details, tagIds:e})} value={details.tagIds} loadOptions={getTags} cacheOptions defaultOptions/>
                    <label htmlFor='description'>Opis događaja: </label>
                    <textarea type='text' name='description' id='description' onChange={e => setDetails({...details, description:e.target.value})} value={details.description}/>
                    <label htmlFor='coordinates'>Koordinate mjesta događaja: </label>
                    <input type='text' name='coordinates' id='coordinates' onChange={e => setDetails({...details, coordinates:e.target.value})} value={details.coordinates}/>
                </div>
                <button type='submit' name='register'>Dodaj događaj</button>
                <button type='button' name='register' onClick={() => props.close()}>Odustani</button>
                {(premium == true && details.promoted == '' && details.typeId.value == '3') ? (<button type='button' name='premium' onClick={() => setDetails({...details, promoted: true})}>Promoviraj</button>) : ''}
            </div>
        </form>
  )
}

export default CreateEventForm;