import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LoginForm from './components/LoginForm';
import Register from './Register';


function App () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onLoginForm() {
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/*' element={<LoginForm onLoginForm={onLoginForm}/>} />
      </Routes>
    </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
