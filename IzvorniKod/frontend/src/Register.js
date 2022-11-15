import React, { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
function Register() {

    const [errors, setErrors] = useState('');

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
                    ReactSession.set("isLoggedIn", "true")
                    ReactSession.set("username", details.name)
                    console.log(ReactSession.get("isLoggedIn"))
                    navigate('/');
                } else {

                    setErrors("Neispravno uneseni podaci");
                }
            });
    }

    return (
        <div className='App'>
            {(ReactSession.get("isLoggedIn") === "true") ? (
                navigate('/')
            ) : (
                <SignUpForm Register={Register} errors={errors} />
            )}
        </div>
    );

}

export default Register;
