import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';
function MojiPrijatelji() {
    const [userData, setUserData] = useState({ username: '', moderator: false, admin: false })
    const [listaFrendova, setFriends] = useState([])

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
        getFriends()
        getUserData()
    }, [])

    const getFriends = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/user/friends', options)
            .then(response => {
              response.json().then(json => {
                console.log(json)
                const helpArray = []
                json.userList.map(ev => helpArray.push(ev))
                setFriends(helpArray)
            })
        })
    }
    console.log(listaFrendova)

    return (
        <div>
            <Navbar />
            <div>
                {(listaFrendova.length > 0) ? (listaFrendova.map(frend => 
                    <div>
                        <div>
                            <h2 style={{marginLeft: "10px", marginTop: "20px"}}> Lista mojih prijatelja: </h2>
                        </div>

                        <div>
                        <ol style={{marginLeft: "50px", marginTop: "20px", fontSize: "20px"}}>
                            <li  key="{frend.nickname}">{frend.nickname}</li>
                        </ol>
                        </div>
                    </div>
                )) : (<div>Nazalost nemate prijatelja</div>)}

            </div>
        </div>
    );
}

export default MojiPrijatelji;