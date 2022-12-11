import React from 'react'
import myImage from '../Slike/eventkoLogo.png'
import { ReactSession } from 'react-client-session';
function Navbar() {
    const username = ReactSession.get("username");
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

                    <li><a >Obavijesti</a></li>
                    <li><a >Moji Prijatelji</a></li>
                    <li><a >Pohađani Eventi</a></li>
                    <div className='userInfo'>
                        <li><a>{username}</a></li>
                        <li><a href="/" onClick={odjavi}>Odjava</a></li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar