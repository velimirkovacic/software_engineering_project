import React, { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import Button from '@mui/material/Button';

const ProfileInfo = () => {

    console.log(ReactSession.get("nickname"));
    const [details, setDetails] = useState({nickname:ReactSession.get("nickname")});

    const [premium, setPremium] = useState(false);

    const checkPremium = () => {
        const array = ReactSession.get('roles').map(role => role.id)
        if (array.indexOf(2) !== -1) {
            setPremium(true)
        }
    }

    useEffect(() => {
        checkPremium()
    }, [])

    function promoteProfile(id){
        const data = {
            userId: id
        };
        console.log(data.userId)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/user/premium', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        alert(json.message);
                    })
                }
            })
        alert("Uplatite na iban 12345678 LP");
    }

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
                        ReactSession.set("nickname", json.user.nickname)
                        alert('Uspješna promjena nadimka')
                    })
                }
            })
    };

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
                        <br></br>
                        {(premium!==true) ? (<Button variant="contained" name='premium' onClick={e => { e.preventDefault(); promoteProfile(ReactSession.get("id")) }} id={ReactSession.get("id")}>Promoviraj se</Button>) : ('')}
                        <br></br>
                        <br></br>
                        <button type='submit' name='register'>Spremi promjene</button>
                        <a href='/'>Vrati se natrag </a>
                    </div>
            </div>
        </form>
      );
}

export default ProfileInfo;