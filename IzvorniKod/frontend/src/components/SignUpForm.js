import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({Register, errors}) => {

    const [details, setDetails] = useState({name:'', email:'', password:''});
    const navigate = useNavigate();

    const navReg = () => {
        navigate("/");
    };

    const handleSignUpForm = e => {
        e.preventDefault();
        Register(details);
    };

  return (
    <form onSubmit={handleSignUpForm}>
        <div className='form-inner'>
            <h2>Kreiraj korisnički račun</h2>
            {(errors !== '') ? (<div className='errors'>{errors}</div>) : ''}
            <div className='form-group'>
                <label htmlFor='name'>Korisničko ime: </label>
                <input type='text' name='name' id='name' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/> 
            </div>
            <div className='form-group'>
                <label htmlFor='nickname'>Nadimak: </label>
                <input type='text' name='nickname' id='nickname' onChange={e => setDetails({...details, nickname:e.target.value})} value={details.nickname}/> 
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' id='email' onChange={e => setDetails({...details, email:e.target.value})} value={details.email}/>        
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Lozinka: </label>
                <input type='password' name='password' id='password' onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>        
            </div> 
            <div className='form-group'>
                <label htmlFor='rePassword'>Ponovite lozinku: </label>
                <input type='password' name='rePassword' id='rePassword' onChange={e => setDetails({...details, rePassword:e.target.value})} value={details.rePassword}/>        
            </div> 
            <button name='register' onClick={navReg}>Registrirajte se</button>
        </div>
    </form>
  )
}

export default SignUpForm;