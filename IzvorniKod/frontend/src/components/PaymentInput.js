import React, { useState } from 'react';
import { ReactSession } from 'react-client-session';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const PaymentInput = (props) => {

    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCVC] = useState('')
    const [focus, setFocus] = useState('')

    const [error, setError] = useState("");

    const closeModal = () => {
        props.setOpen2(false);
    }

    const handleInputFocus = (e) => {
        setFocus(e.target.name);
    }

    const buyPremium = (id) => {
        const num = parseInt(number)
        var expM = 0
        expM = expM + (parseInt(expiry[0] + expiry[1]))
        var expY = 0
        if (expiry[2] == '/') {
            expY = expY + (parseInt(expiry[3]) * 10  + parseInt(expiry[4])) + 2000
        } else {
            expY = expY + (parseInt(expiry[2]) * 10 + parseInt(expiry[3])) + 2000
        }
        const today = new Date()
        const cv = parseInt(cvc)
        if (isNaN(num)) {
            setError('Neispravan broj kartice')
            document.getElementById('payment').scrollTo(0, 0)
        }
        else if ((number.length != 16) && 
                !(number.length == 15 & number[0] == '3' && number[1] == '4') &&
                !(number.length == 14 & number[0] == '3' && number[1] == '6') &&
                !(number.length == 14 & number[0] == '3' && number[1] == '8') &&
                !(number.length == 14 & number[0] == '3' && number[1] == '0' && number[2] == '0')) {
            setError('Neispravan broj kartice')
            document.getElementById('payment').scrollTo(0, 0)
        }
        else if (name == '') {
            setError('Treba unijeti ime i prezime')
            document.getElementById('payment').scrollTo(0, 0)
        }
        else if (expiry.length != 4 && !(expiry.length == 5 && expiry[2] == '/')) {
            setError('Neispravan datum isteka')
            document.getElementById('payment').scrollTo(0, 0)
        }
        else if (isNaN(expM) || isNaN(expY)) {
            setError('Neispravan datum isteka')
            document.getElementById('payment').scrollTo(0, 0)
        }
        else if (expY < today.getFullYear()) {
            setError('Neispravan datum isteka')
            document.getElementById('payment').scrollTo(0, 0)
        }
        else if (expM > 12) {
            setError('Neispravan datum isteka')
            document.getElementById('payment').scrollTo(0, 0)
        }
        else if (expY == today.getFullYear() && expM <= today.getMonth()) {
            setError('Neispravan datum isteka')
            document.getElementById('payment').scrollTo(0, 0)
        }
        else if (isNaN(cv) || cvc.length != 3) {
            setError('Neispravan CVC')
            document.getElementById('payment').scrollTo(0, 0)
        } else {
            closeModal()
            props.promoteProfile(id)
        }
    }

    return (
        <form>
            <div id='payment' className='form-inner2' style={{padding: '50px', overflowY: 'scroll'}}>
                <h2 style={{fontSize: '28px'}}>Kupnja premium računa</h2>
                <div id="PaymentForm">
                    <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}
                    />
                    <div className='form-group' style={{width: '100%', marginTop: '25px'}}>
                        {(error !== '') ? (<div className='errors'>{error}</div>) : ''}
                        <label>Broj kartice: </label>
                        <input type='text' name='number' placeholder='**** **** **** ****' onFocus={e => handleInputFocus(e)} onChange={e => setNumber(e.target.value)}/> 
                        <label>Ime i prezime: </label>
                        <input type='text' name='name' placeholder='Unesite ime i prezime...' onFocus={e => handleInputFocus(e)} onChange={e => setName(e.target.value)}/>
                        <label>Vrijedi do: </label>
                        <input type='text' name='expiry' placeholder='MM/YY' onFocus={e => handleInputFocus(e)} onChange={e => setExpiry(e.target.value)}/> 
                        <label>CVC: </label>
                        <input type='text' name='cvc' placeholder='***' onFocus={e => handleInputFocus(e)} onChange={e => {if (e.target.value.length < 4) {setCVC(e.target.value)}}}/> 
                    </div>
                </div>
                    <div style={{marginTop: '15px'}}>
                        <button type='button' name='register' onClick={() => buyPremium(ReactSession.get('id'))}>Kupi</button>
                        <button type='button' name='register' onClick={() => closeModal()}>Odustani</button>
                    </div>
            </div>
        </form>
    )
}

export default PaymentInput;