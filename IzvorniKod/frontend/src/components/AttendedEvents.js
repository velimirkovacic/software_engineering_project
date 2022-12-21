
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import myImage from '../Slike/eventkoLogo.png'
import { useEffect } from 'react';
import Navbar from './Navbar';

function AttendedEvents() {
    const [userData, setUserData] = useState({ username: '', moderator: false, admin: false })

    const getUserData = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/user', options)
            .then(response => {
                response.json().then(json => {
                    console.log(json)
                    const helpObject = { username: json.user.username, moderator: false, admin: false }
                    if (json.user.roles.map(role => role.id).indexOf(3) != -1) {
                        helpObject.moderator = true
                    }
                    if (json.user.roles.map(role => role.id).indexOf(4) != -1) {
                        helpObject.admin = true
                    }
                    setUserData(helpObject)
                })
            });
    }

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <body>
            <Navbar />
            <div>
                <a>Niste bili niti na jednom eventu</a>
                <a href="/">Povratak</a>
            </div>
        </body>
    );
}

export default AttendedEvents;