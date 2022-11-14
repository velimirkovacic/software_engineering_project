import React from 'react'
import myImage from '../Slike/eventkoLogo.png'

function Navbar() {
    return (
        <nav className='nav'>
            <a href="/"><img src={myImage} alt="" /></a>
            <div className='navComp'>
                <ul>

                    <li><a href="/">Obavijesti</a></li>
                    <li><a href="/">Moji Prijatelji</a></li>
                    <li><a href="/">Pohađani Eventi</a></li>
                    <div className='userInfo'>
                        <li><a href="/">Korisnik</a></li>
                        <li><a href="/">Odjava</a></li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar