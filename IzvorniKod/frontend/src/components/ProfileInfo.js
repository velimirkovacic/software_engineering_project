import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

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

    function promoteProfile(){
        alert("Uplatite na iban 12345678 pa će vas admin ručno dodat LP");
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
                        <br></br>
                        {(premium!=true) ? (<button type='button' name='premium' onClick={promoteProfile}>Promoviraj se</button>) : ('')}
                        <br></br>
                        <br></br>
                        <button type='submit' name='register'>Spremi promjene</button>
                        <a href='/' onClick={povratak}>Vrati se natrag </a>
                    </div>
            </div>
        </form>
      );
}

export default ProfileInfo;