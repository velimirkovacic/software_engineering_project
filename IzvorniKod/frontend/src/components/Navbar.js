import React from 'react'
import myImage from '../Slike/eventkoLogo.png'
import { ReactSession } from 'react-client-session';

function Navbar() {

    function notifications() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/user/notifications', options)
            .then(response => {
                console.log(response)
            });
    }

    function attended() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/user/attended', options)
            .then(response => {
                console.log(response)
            });
    }

    function profileDetails() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/user/profile', options)
            .then(response => {
                console.log(response)
            });
    }

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
                    <li><a href="/notifications" onClick={notifications}>Obavijesti</a></li>
                    <li><a>Moji Prijatelji</a></li>
                    <li><a href="/attended" onClick={attended}>Pohađani Eventi</a></li>
                    <div className='userInfo'>
                        <li><a href="/profile" onClick={profileDetails}>{ReactSession.get("nickname")}</a></li>
                        <li><a href="/" onClick={odjavi}>Odjava</a></li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar