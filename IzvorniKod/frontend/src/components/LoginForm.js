import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import Popup from 'reactjs-popup';

function LoginForm(props) {
    const [details, setDetails] = useState({ name: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(''); //initial state

    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
        navigate('/')
    }

    function onSubmit(e) {
        e.preventDefault();
        setError("");
        const data = {
            username: details.name,
            password: details.password
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        fetch('/api/login', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        ReactSession.set("id", json.user.id)
                        ReactSession.set("username", json.user.username)
                        ReactSession.set("roles", json.user.roles)
                        ReactSession.set("suspended", json.user.suspended)
                        ReactSession.set("nickname", json.user.nickname)
                        ReactSession.set("email", json.user.email)
                        if (props.onLoginForm) { //check that the instance is still mounted
                            ReactSession.set("isLoggedIn", "true");
                            props.onLoginForm();
                        }
                        if (json.user.suspended == true) {
                            setOpen(true)
                        } else {
                            navigate('/')
                        }
                    })
                } else {
                    response.json().then(json => {
                        console.log(json)
                        setError(json.message)
                    })
                }
            })
    }

    const navRegister = () => {
        navigate('/register');
    }

    //onChange se odvija (ovdje postavlja nove vrijednosti) svakom promjenom vrijednosti elementa
    //submitHandler da vodi na taj LogIn
    return (
        <div>
            <div className='App'>
                <form onSubmit={onSubmit}>
                    <div className='form-inner'>
                        <h2>Prijava</h2>
                        {(error !== '') ? (<div className='error'>{error}</div>) : ''}
                        <div className='form-group'>
                            <label htmlFor='name'>Korisničko ime: </label>
                            <input type='text' name='name' id='name' onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Zaporka: </label>
                            <input type='password' name='password' id='password' onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                        </div>
                        <input type='submit' name='login' value='Prijava' />
                        <label htmlFor='or'>Ukoliko nemate račun, </label>
                        <button type='signUp' name='signup' onClick={navRegister}>registrirajte se </button>
                    </div>
                </form>
            </div>
            <Popup class="popup-overlay" open={open} position="center center" closeOnDocumentClick={0}>
                <form>
                    <div className='form-inner2' style={{padding: '50px', overflow: 'unset'}}>
                        <div className='form-group' name='eventinfo-form' style={{width:'20vw', marginBottom: '0'}}>
                            <p style={{fontSize: '20pt', marginBottom: '20px'}}>Vaš račun je suspendiran! Nećete više imati mogućnost stvaranja javnih događaja.</p>
                            <button type='button' name='register' onClick={() => closeModal()}>U redu</button>
                        </div>
                    </div>
                </form>
            </Popup>
        </div>
    )
}


export default LoginForm;