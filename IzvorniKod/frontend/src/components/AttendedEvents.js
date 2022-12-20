
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import myImage from '../Slike/eventkoLogo.png'
import { useEffect } from 'react';

function AttendedEvents() {
      const [userData, setUserData] = useState({ username: '', moderator: false, admin: false })

      const getUserData = () => {
          const options = {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/JSON'
              }
          };
          fetch('/api/user', options)
              .then(response => {
                  response.json().then(json => {
                      console.log(json)
                      const helpObject = { username: json.user.username, moderator: false, admin: false }
                      if (json.user.roles.map(role => role.id).indexOf(3) != -1) {
                          helpObject.moderator = true
                      }
                      if (json.user.roles.map(role => role.id).indexOf(4) != -1) {
                          helpObject.admin = true
                      }
                      setUserData(helpObject)
                  })
              });
      }
  
      useEffect(() => {
          getUserData()
      }, [])
  
      function odjavi() {
          ReactSession.set("isLoggedIn", "false");
          const options = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/JSON'
              }
          };
          fetch('/api/user/logout', options)
              .then(response => {
                  console.log(response)
              });
      }
      return (
          <body>
              <nav className='nav'>
                  <a href="/"><img src={myImage} alt="" /></a>
                  <div className='navComp'>
                      <ul>
                          <li><a href="/notifications">Obavijesti</a></li>
                          <li><a href="/moji_prijatelji">Moji Prijatelji</a></li>
                          <li><a href="/attended">Pohađani Eventi</a></li>
                          {(userData.moderator === true) ? (<li><a href="/userActions">Upravljaj korisnicima</a></li>) : ('')}
                          {(userData.admin === true) ? (<li><a href="/admin">Administrativne ovlasti</a></li>) : ('')}
                          <div className='userInfo'>
                              {(userData.username !== '') ? (<li><a href="/profile">{userData.username}</a></li>) : ('')}
                              <li><a href="/" onClick={odjavi}>Odjava</a></li>
                          </div>
                      </ul>
                  </div>
              </nav>
                  <div>
                        <a>Niste bili niti na jednom eventu</a>
                        <a href="/">Povratak</a>
                  </div>
            </body>
      );
}

export default AttendedEvents;