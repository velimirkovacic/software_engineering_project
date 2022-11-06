import React, {useState} from 'react';

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name:'', email:'', password:''});

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

//onChange se odvija (ovdje postavlja nove vrijednosti) svakom promjenom vrijednosti elementa
  return (
    <form onSubmit={submitHandler}>
        <div className='form-inner'>
            <h2>Prijava</h2>
            {(error !== '') ? (<div className='error'>{error}</div>) : ''}
            <div className='form-group'>
                <label htmlFor='name'>Korisničko ime: </label>
                <input type='text' name='name' id='name' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/> 
            </div> 
            <div className='form-group'>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' id='email' onChange={e => setDetails({...details, email:e.target.value})} value={details.email}/>        
            </div>    
            <div className='form-group'>
                <label htmlFor='password'>Zaporka: </label>
                <input type='password' name='password' id='password' onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>        
            </div> 
            <input type='submit' value='Prijavi se'/>
        </div>
    </form>
  )
}

export default LoginForm;