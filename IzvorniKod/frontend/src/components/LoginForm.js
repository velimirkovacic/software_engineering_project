import React, {useState} from 'react';
import { InputHTMLAttributes } from 'react';

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name:'', password:''});

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
        
    }

    function onSignUp(e) {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        //fetch(input: '/SignUpForm', options);
    }

//onChange se odvija (ovdje postavlja nove vrijednosti) svakom promjenom vrijednosti elementa
//submitHandler da vodi na taj LogIn
  return (
    <form onSubmit={submitHandler}>
        <div className='form-inner'>
            <h2>Prijava</h2>
            {(error !== '') ? (<div className='error'>{error}</div>) : ''}
            <div className='form-group'>
                <label htmlFor='name'>Korisničko ime: </label>
                <input type='text' name='name' id='name' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/> 
            </div> 
            <div className='form-group'>
                <label htmlFor='password'>Zaporka: </label>
                <input type='password' name='password' id='password' onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>        
            </div> 
            <input type='submit' name='login' value='Prijava'/>
            <label htmlFor='or'>Ukoliko nemate račun, </label>
            <input type='submit' name='signup' value='registrirajte se'/>
            <button type='signUp'>Registracija </button>
        </div>
    </form>
  )
}

export default LoginForm;