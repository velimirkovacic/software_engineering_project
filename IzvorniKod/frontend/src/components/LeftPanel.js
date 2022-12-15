import React, {useState} from 'react'
import Popup from 'reactjs-popup'

import CreateEventForm from './CreateEventForm'

function LeftPanel(props) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <div className='outerLeft'>
            <div className='inner'>
                <button className='btnAdd' onClick={() => setOpen(true)}>Dodaj u kalendar</button>
            </div>
            <div className='inner'>
                <div className='activeUsers'>
                    <h3>Aktivni korisnici</h3>
                    <h4>1.</h4>
                    <h4>2.</h4>
                    <h4>3.</h4>
                </div>
                <div className='promoEvents'>
                    <h3>Istaknuti eventi</h3>
                    <h4>1.</h4>
                    <h4>2.</h4>
                    <h4>3.</h4>
                </div>
            </div>
            <Popup class="popup-overlay" open={open} position="center center" closeOnDocumentClick={0}>
                <CreateEventForm close={closeModal} removeAllEvents={props.removeAllEvents} getEvents={props.getEvents}/>
            </Popup>

        </div>
    )
}

export default LeftPanel