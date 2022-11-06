import React, {useState} from 'react';
import LoginForm from './components/LoginForm';

function App() {
  //napravljeno s jednim korisnikom za pocetak
  const adminUser = {
    email: 'admin@admin.com',
    password: 'admin123'
  }

  const [user, setUser] = useState({name: '', email: ''});
  const [error, setError] = useState('');

  const Login = details => {
    console.log(details);

    //handelanje forme
    if (details.email === adminUser.email && details.password === adminUser.password) {
      console.log('Admin je ulogiran');
      setUser({
        name: details.name, 
        email: details.email
      })
    } else {
      setError('Uneseni podaci su neispravni!')
    }
  }

  const Logout = () => {
    setUser({name: '', email: ''});
    setError('');
  }

  //samo pocetni primjer da negdje vodi taj login
  return (
    <div className='App'> 
      {(user.email !== '') ? (
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
