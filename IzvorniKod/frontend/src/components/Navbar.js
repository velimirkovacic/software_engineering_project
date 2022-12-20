import React from 'react'
import myImage from '../Slike/eventkoLogo.png'
import { ReactSession } from 'react-client-session';
import { useState } from 'react';
import { useEffect } from 'react';
function Navbar() {

    const roles = ReactSession.get("roles");
    let isMod = false;
    console.log(roles)
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Moderator') {
            isMod = true;
            console.log("DSDFFFVDBLČ")
            console.log(isMod)
        }
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
                    <li><a href="/notifications">Obavijesti</a></li>
                    <li><a>Moji Prijatelji</a></li>
                    <li><a href="/attended">Pohađani Eventi</a></li>
                    {isMod && <li><a href="/userActions">Upravljaj korisnicima</a> </li>}
                    <div className='userInfo'>
                        <li><a href="/profile">{ReactSession.get("nickname")}</a></li>
                        <li><a href="/" onClick={odjavi}>Odjava</a></li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar