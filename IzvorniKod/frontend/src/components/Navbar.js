import React from 'react'
import myImage from '../Slike/eventkoLogo.png'
import { ReactSession } from 'react-client-session';
import { useState } from 'react';
import { useEffect } from 'react';
function Navbar() {

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
                    ReactSession.set('score', json.user.score)
                })
            });
    }

    useEffect(() => {
        getUserData()
    }, [])

    function odjavi() {
        ReactSession.set("isLoggedIn", "false");
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/user/logout', options)
            .then(response => {
                console.log(response)
            });
    }

    return (
        <nav className='nav'>
            <a href="/"><img src={myImage} alt="" /></a>
            <div className='navComp'>
                <ul>
                    <li><a href="/moji_prijatelji">Moji Prijatelji</a></li>
                    <li><a href="/attended">Pohađani Eventovi</a></li>
                    {(userData.moderator === true) ? (<li><a href="/userActions">Upravljaj korisnicima</a></li>) : ('')}

                    <div className='userInfo'>
                        {(userData.username !== '') ? (<li><a href="/profile">{userData.username}</a></li>) : ('')}
                        <li><a href="/" onClick={odjavi}>Odjava</a></li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar