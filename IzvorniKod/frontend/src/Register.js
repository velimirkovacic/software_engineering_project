import React, { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import { useNavigate } from 'react-router-dom'

function Register() {

    const [errors, setErrors] = useState('');
    let prijelaz = 'ne';
    const navigate = useNavigate();

    const Register = details => {
        console.log(details);
        //handelanje forme
        if ((details.name !== '') && details.password !== '') {
            console.log('Registriran je novi korisnik');
            prijelaz = 'da';
            console.log(prijelaz);

        } else {
            setErrors('Nisu uneseni podaci!')
        }
    }

    return (
        <div className='App'>
            {(prijelaz === 'da') ? (
                navigate('/')
            ) : (
                <SignUpForm Register={Register} errors={errors} />
            )}
        </div>
    );

}

export default Register;
