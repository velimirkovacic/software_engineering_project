import React, { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import PaymentInput from './PaymentInput';

const ProfileInfo = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const closeModal = () => {
        setOpen(false);
        navigate('/')
    }

    const [message, setMessage] = useState('')

    const navigate = useNavigate();

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
                        const roleList = ReactSession.get("roles")
                        roleList.push({id: 2})
                        ReactSession.set("roles", roleList)
                        setMessage(json.message)
                        setOpen(true)
                    })
                }
            })
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
                        ReactSession.set("nickname", details.nickname)
                        setMessage(json.message)
                        setOpen(true)
                    })
                }
            })
    };

    return (
        <div>
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
                            <div className='form-group'>
                                <label name='profile'>Korisnički score: {ReactSession.get("score")}</label>
                            </div>
                            <br></br>
                            {(premium!==true) ? (<button name='premium' onClick={e => { e.preventDefault(); setOpen2(true) }}>Kupnja premium računa</button>) : ('')}
                            <br></br>
                            <br></br>
                            <button type='submit' name='register'>Spremi</button>
                            <button type='button' name='register' style={{marginLeft: '4px'}} onClick={() => navigate('/')}>Odustani</button>
                        </div>
                </div>
            </form>
            <Popup class="popup-overlay" open={open} position="center center" closeOnDocumentClick={0}>
                <form>
                    <div className='form-inner2' style={{padding: '50px', overflow: 'unset'}}>
                        <div className='form-group' name='eventinfo-form' style={{minWidth: '0', marginBottom: '0'}}>
                            <p style={{fontSize: '20pt', marginBottom: '20px'}}>{message}</p>
                            <button type='button' name='register' onClick={() => closeModal()}>U redu</button>
                        </div>
                    </div>
                </form>
            </Popup>
            <Popup class="popup-overlay" open={open2} position="center center" closeOnDocumentClick={0}>
                <PaymentInput setOpen={setOpen} setOpen2={setOpen2} promoteProfile={promoteProfile}/>
            </Popup>
        </div>
      );
}

export default ProfileInfo;