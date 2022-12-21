import React, { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup';

function Register() {

    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
        navigate('/')
    }

    const [errors, setErrors] = useState('');
    let prijelaz = 'ne';
    const navigate = useNavigate();
    
    function imaNedozvoljenZnak(str){
        var listStr=str.split('')
        var retval=false
        for (let i = 0; i < listStr.length; i++){
          //console.log(listStr[i])
            if ( (listStr[i].toLowerCase() !== listStr[i].toUpperCase()) || (listStr[i] >= '0' && listStr[i] <= '9') || listStr[i]==='_'){
                //ne radij nista
            } else {
                retval=true
            }
            //console.log(retval)
        }
        return retval
    }

    function emailNeispravan(str){
        if (!str.includes("@")){
            return true
        } else if (!str.includes(".")){
            return true
        } else {
            var lista = str.split('@')
            if (lista[0] === ""){
                return true
            }
            if(!lista[1].includes('.')){
                return true
            }
        }
        return false

    }

    const Register = details => {
        console.log(details);
        //handelanje forme
        setErrors("");
        if (details.name.length<2  || details.name.length>25 || imaNedozvoljenZnak(details.name) ) {
            setErrors("Username mora biti dugačak od 2 do 25 znakova i smije sadržavati samo slova, brojeve i '_' znak");
        } else if (emailNeispravan(details.email)) {
            setErrors("Email adresa nije ispravna (primjer ispravnog formata ime@domena.hr)");
        } else if ( details.password.length<4) {
            setErrors("Lozinka mora biti dugačka bar 4 znaka")   
        } else {
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
                        setOpen(true)
                    } else {
                        setErrors("Neispravno uneseni podaci");
                    }
                });
        }
    }

    return (
        <div>
            <div className='App'>
            {prijelaz==='da' ? ('') : (
                <SignUpForm Register={Register} errors={errors} />
            )}
            </div>
            <Popup class="popup-overlay" open={open} position="center center" closeOnDocumentClick={0}>
                <form>
                    <div className='form-inner2' style={{padding: '50px', overflow: 'unset'}}>
                        <div className='form-group' name='eventinfo-form' style={{minWidth: '0', marginBottom: '0'}}>
                            <h2 style={{fontSize: '23pt'}}>Uspješna registracija</h2>
                            <button type='button' name='register' onClick={() => closeModal()}>U redu</button>
                        </div>
                    </div>
                </form>
            </Popup>
        </div>
    );

}

export default Register;
