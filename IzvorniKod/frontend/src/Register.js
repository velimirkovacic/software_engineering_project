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
        setErrors("");
        const data = {
            username: details.name,
            password: details.password,
            email: details.email,
            nickname: details.nickname
        };
      
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        fetch('/api/register', options)
        .then(response => {
            console.log(response);
            if (response.ok) {
                prijelaz = 'da';
                navigate('/');
            } else {
                setErrors("Neispravno uneseni podaci");
            }
        });
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
