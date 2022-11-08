import React, {useEffect, useState} from 'react';
import registerValidation from './registerValidation';

const SingUpForm = ({submitSignup}) => {

    const [details, setDetails] = useState({name:'', email:'', password:''});
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const handleSignUpForm = e => {
        e.preventDefault();
        setErrors(registerValidation(details));
        setDataIsCorrect(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            submitSignup(true);
        }
    }, [errors]);

  return (
    <form onSubmit={handleSignUpForm}>
        <div className='form-inner'>
            <h2>Kreiraj korisnički račun</h2>
            <div className='form-group'>
                <label htmlFor='name'>Korisničko ime: </label>
                <input type='text' name='name' id='name' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/> 
                {errors.name && <p className='error'>{errors.name}</p>}
            </div>
            <div className='form-group'>
                <label htmlFor='nickname'>Nadimak: </label>
                <input type='text' name='nickname' id='nickname' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/> 
                {errors.nickname && <p className='error'>{errors.nickname}</p>}
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' id='email' onChange={e => setDetails({...details, email:e.target.value})} value={details.email}/>        
                {errors.email && <p className='error'>{errors.email}</p>}
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Lozinka: </label>
                <input type='password' name='password' id='password' onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>        
                {errors.password && <p className='error'>{errors.password}</p>}
            </div> 
            <div className='form-group'>
                <label htmlFor='rePassword'>Ponovite lozinku: </label>
                <input type='password' name='rePassword' id='rePassword' onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>        
                {errors.rePassword && <p className='error'>{errors.rePassword}</p>}
            </div> 
            <input type='submit' name='register' value='Registrirajte se'/>
            <button class='sign-up' onclick='handleSignUpForm()'>Registracija</button>
        </div>
    </form>
  )
}

export default SingUpForm;