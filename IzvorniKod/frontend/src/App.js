import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import LoginForm from './components/LoginForm';
import Register from './Register';
import ProfileInfo from './components/ProfileInfo';
import { ReactSession } from 'react-client-session';
import UserActions from './UserActions';


function App() {
  ReactSession.setStoreType("localStorage");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onLoginForm() {
    setIsLoggedIn(true);
    ReactSession.set("isLoggedIn", "true");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ReactSession.get("isLoggedIn") === "true" ? <Home /> : <Navigate to ='/login' />} />
        <Route path='/login' element={<LoginForm onLoginForm={onLoginForm} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/userActions' element={<UserActions />} />
        <Route path='/profile' element={<ProfileInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
