import React, {useState} from 'react';
import LoginForm from './components/LoginForm';

function App() {
  //napravljeno s jednim korisnikom za pocetak
  const adminUser = {
    name: 'admin',
    password: 'admin123'
  }

  const [user, setUser] = useState({name: ''});
  const [error, setError] = useState('');

  const Login = details => {
    console.log(details);

    //handelanje forme
    if ((details.name === adminUser.name) && details.password === adminUser.password) {
      console.log('Admin je ulogiran');
      setUser({
        name: details.name, 
      })
    } else {
      setError('Uneseni podaci su neispravni!')
    }
  }

  const Logout = () => {
    setUser({name: ''});
    setError('');
  }

  //samo pocetni primjer da negdje vodi taj login
  return (
    <div className='App'> 
      {(user.name !== '') ? (
        <div className='welcome'>
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );

}

export default App;
