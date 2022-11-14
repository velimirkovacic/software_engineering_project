import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import LoginForm from './components/LoginForm';
import Register from './Register';


function App () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onLoginForm() {
    setIsLoggedIn(true);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to='/login'/>} />
        <Route path='/login' element={<LoginForm onLoginForm={onLoginForm}/>} />
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
