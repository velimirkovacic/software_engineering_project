import React, { useState } from 'react';
import SignUpForm from './components/SingUpForm';
import { useNavigate } from 'react-router-dom'

function Register() {
    //napravljeno s jednim korisnikom za pocetak

    const [user, setUser] = useState({ name: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const Register = details => {
        console.log(details);

        //handelanje forme
        if ((details.name !== '') && details.password !== '') {
            console.log('Registriran je novi korisnik');

        } else {
            setError('Nisu uneseni podaci!')
        }
    }

    return (
        <div className='App'>
            {(user.name !== '') ? (
                navigate('/')
            ) : (
                <SignUpForm Register={Register} error={error} />
            )}
        </div>
    );

}

export default Register;
