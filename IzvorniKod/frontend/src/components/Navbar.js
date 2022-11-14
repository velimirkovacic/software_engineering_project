import React from 'react'
import myImage from '../Slike/eventkoLogo.png'

function Navbar() {
    return (
        <nav className='nav'>
            <a href="/"><img src={myImage} alt="" /></a>
            <div className='navComp'>
                <ul>

                    <li><a href="/obavijesti">Obavijesti</a></li>
                    <li><a href="/mojiPrijatelji">Moji Prijatelji</a></li>
                    <li><a href="/pohadaniEventi">Pohađani Eventi</a></li>
                    <li><a href="/korisnik">Korisnik</a></li>
                    <li><a href="/login">Odjava</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar