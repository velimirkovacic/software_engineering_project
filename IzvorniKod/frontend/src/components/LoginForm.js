import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom'

function LoginForm(props) {
    const [details, setDetails] = useState({ name: '', password: '' });
    //const navigate = useNavigate();
    const [error, setError] = useState(''); //initial state

    function onSubmit(e) {
        e.preventDefault();
        setError("");
        //Login(details);
        /*const body = `username=${details.name}&password=${details.password}`;
        console.log(body);
        const options = {
            method: 'POST',
            body: body
        };
        fetch("/api/login", options)
            .then(response => {
                console.log(response);
                if (response.status === 401) {
                    setError("Login failed");
                } else {
                    props.onLoginForm();
                }
            });*/
    }

    //const navRegister = () => {
    //    navigate('/register');
    //}

    //onChange se odvija (ovdje postavlja nove vrijednosti) svakom promjenom vrijednosti elementa
    //submitHandler da vodi na taj LogIn
    return (
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
    
            </div>
        </form>
        </div>
    )
}
//<button type='signUp' name='signup' onClick={navRegister}>registrirajte se </button>

export default LoginForm;