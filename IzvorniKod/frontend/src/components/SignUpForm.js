import React, {useState} from 'react';

const SignUpForm = ({Register, errors}) => {

    const [details, setDetails] = useState({name:'', email:'', password:'', repassword:''});

    const handleSignUpForm = e => {
        e.preventDefault();
        Register(details);
    };
 
  return (
    <form onSubmit={handleSignUpForm}>
        <div className='form-inner'>
            <h2>Kreiraj korisnički račun</h2>
            {(errors !== '') ? (<div style={{maxWidth: '300px'}}>{errors}</div>) : ''}
            <div className='form-group'>
                <label htmlFor='name'>Korisničko ime: </label>
                <input type='text' name='name' id='name' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/> 
            </div>
            <div className='form-group'>
                <label htmlFor='nickname'>Nadimak: (opcionalno)</label>
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
                <label htmlFor='password'>Ponovite lozinku: </label>
                <input type='password' name='password' id='repassword' onChange={e => setDetails({...details, repassword:e.target.value})} value={details.repassword}/>        
            </div> 
            <button type='submit' name='register'>Registrirajte se</button>
            <a>ili </a>
            <a href='/'>odustanite </a>
        </div>
    </form>
  )
}

export default SignUpForm;