import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';
function Notifications() {
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
            <div id="container">
                <a>Nemate novih obavijesti</a>
                <a href="/">Povratak</a>
            </div>
        </body>
    );
}

export default Notifications;