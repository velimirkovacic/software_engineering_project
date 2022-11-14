import React, { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import { useNavigate } from 'react-router-dom'

function Register() {

    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const prezime = 'nes';

    const Register = details => {
        console.log(details);
        //handelanje forme
        if ((details.name !== '') && details.password !== '') {
            console.log('Registriran je novi korisnik');

        } else {
            setErrors('Nisu uneseni podaci!')
        }
    }

    return (
        <div className='App'>
            {(prezime !== '') ? (
                navigate('/')
            ) : (
                <SignUpForm Register={Register} errors={errors} />
            )}
        </div>
    );

}

export default Register;
