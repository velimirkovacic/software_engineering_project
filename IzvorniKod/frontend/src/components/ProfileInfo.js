import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

const ProfileInfo = () => {

    console.log(ReactSession.get("nickname"));
    const [details, setDetails] = useState({nickname:ReactSession.get("nickname")});

    const handleProfile = e => {
        e.preventDefault();
        //ovdje u bazi spremanje novog nicknamea 
        const data = {
            nickname : details.nickname, 
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/user/nickname', options) 
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        alert('Uspješna promjena nadimka')
                    })
                }
            })
    };

    function povratak() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/', options)
            .then(response => {
                console.log(response)
            });
    }

    return (
        <form onSubmit={handleProfile}>
            <div className="App">
                    <div className='form-inner'>
                        <h2>Vaš korisnički profil</h2>
                        <div className='form-group'>
                            <label name='profile'>Nadimak: </label>
                            <input type='text' name='nickname' id='nickname' onChange={e => setDetails({ ...details, nickname: e.target.value })} value={details.nickname}/> 
                        </div>
                        <div className='form-group'>
                            <label name='profile'>Korisničko ime: {ReactSession.get("username")}</label>
                        </div>
                        <div className='form-group'>
                            <label name='profile'>E-mail: {ReactSession.get("email")}</label>
                        </div>
                        <button type='submit' name='register'>Spremi promjene</button>
                        <a href='/' onClick={povratak}>Vrati se natrag </a>
                    </div>
            </div>
        </form>
      );
}

export default ProfileInfo;