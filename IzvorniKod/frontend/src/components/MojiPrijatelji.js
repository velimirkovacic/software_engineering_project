import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import ListFriends from './ListFriends';

function MojiPrijatelji() {
    const [listaFrendova, setFriends] = useState([])
    const [userIds, setUserIds] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getFriends()
    }, [])


    //funkcija za dohvaćanje prijatelja
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
                const helpArray = []
                json.userList.map(ev => helpArray.push(ev))
                setFriends(helpArray)

                const helpArray2 = []
                json.userList.map(user => helpArray2.push(user.id))
                setUserIds(helpArray2)
                setLoaded(true)
            })
        })
    }
    //console.log(listaFrendova)


    // funkcija za unfriendanje prijatelja
    function refreshPage() {
        getFriends();
        window.location.reload(false);

    }

    function unfriend(id) {
        const data = {
            userId: id
        };
        console.log("Evo ti ID korisnika kojeg brisem")
        console.log(data.userId)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/user/unfriend', options)
        
        const helpArray = []
        listaFrendova.map(user => helpArray.push(user))
        if (helpArray.length > 1) {
            helpArray.splice(userIds.indexOf(id), 1)
            setFriends(helpArray)
        } else {
            setFriends([])
        }
    }

        //za popis svih korisnika
        const [inputText1, setInputText1] = useState("");
        let inputHandler1 = (e) => {
            var lowerCase = e.target.value.toLowerCase();
            setInputText1(lowerCase);
        };

        function findUser(){
            let div = document.getElementById('expand')
            if (div.style.display == 'flex') {
                div.style.display = 'none';
            } else {
                div.style.display = 'flex'; }
        }

    return (
        <div>
            <Navbar />
            <div>
                <h2 style={{marginLeft: "50px", marginTop: "20px"}}> Lista mojih prijatelja: </h2>
            </div>
            <ol style={{marginLeft: "50px", marginTop: "20px", fontSize: "20px"}}>
                {(listaFrendova.length > 0) ? (listaFrendova.map(frend => 
                    <div>
                            <div style={{marginTop: "10px"}} key="{frend.nickname}">{frend.nickname}<span style={{color: 'grey'}}>{' @' + frend.username}</span>
                                <Button variant="contained" className='unfriend' style={{marginLeft: "10px"}}
                                    onClick={e => { e.preventDefault(); unfriend(frend.id) }} id={frend.username}
                                    key={frend.username}>UNFRIEND</Button>
                            </div>
                            
                    </div>
                )) : ('')}
                {(listaFrendova.length == 0 && loaded == true) ? (<div>Nažalost nemate prijatelja</div>) : ('')}
            </ol>
            <ol style={{marginLeft: "50px", marginTop: "20px", fontSize: "40px"}}>
            <Button variant="contained" style={{marginLeft: "10px", background:"gray"}} onClick={findUser}>Pretraži korisnike</Button>            
            </ol>
            <div className="App" id="expand">
            <div className='sus'>
                <div className='main'>
                    <h1>Korisnici</h1>
                    <div className="search">
                        <TextField
                            id="outlined-basic"
                            onChange={inputHandler1}
                            variant="outlined"
                            fullWidth
                            label="Search"
                        />
                    </div>
                    <ListFriends input={inputText1} listaFrendova={listaFrendova} setFriends={setFriends}/>
                </div>
            </div>
            </div>
        </div>
    );
}

export default MojiPrijatelji;