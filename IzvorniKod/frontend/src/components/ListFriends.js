import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';


function ListFriends(props) {

    const [listaFrendova, setFriends] = useState([])
    const [users, setUsers] = useState([]);
    const [blocked, setBlocked] = useState([])

    useEffect(() => {
        getBlocked()
    }, [])

    const getBlocked = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/api/user/blocked', options)
            .then(response => {
              response.json().then(json => {
                const helpArray = []
                json.userList.map(ev => helpArray.push(ev.id))
                setBlocked(helpArray)
            })
        })
    }

    useEffect(() => {
        getFriends()
    }, [])

    //dohvaćanje prijatelja
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
                json.userList.map(ev => helpArray.push(ev.id))
                setFriends(helpArray)
            })
        })
    }

    //svi korisnici
    useEffect(() => {
        fetch('/api/user/users')
           .then(data => data.json())
           .then(users => {
               setUsers(users.userList)
               console.log("OVO")
               console.log(users.userList)
            })
    }, []);

    const filteredData = users.filter((el) => {
        if (props.input === '' && !listaFrendova.includes(el.id)) {
            return el;
        }
        else if (!listaFrendova.includes(el.id)){
            return el.username.toLowerCase().includes(props.input)
        }
    })

    function refreshPage() {
        window.location.reload(false);
    }

    function friend(id) {
        const data = {
            userId: id
        };
        console.log(data.userId)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        fetch('/api/user/friend', options)
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                    })
                }
            })
        refreshPage()        
    }

    function block(id) {
        const data = {
            userId: id
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/user/block', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json.message)
                    })
                }
            })
        refreshPage()
    }

    function unblock(id) {
        const data = {
            userId: id
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/user/unblock', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json.message)
                    })
                }
            })
        refreshPage()
    }

    return (
        <ul>
        {filteredData.map((item) => (
            <div className='attended'>
                <div className='block'>
                <li key={item.id}>{item.username}</li>
                </div>
                <div className='search'>
                <Button variant="contained" onClick={e => { e.preventDefault(); friend(item.id) }} id={item.id}>Dodaj</Button>
                {(!blocked.includes(item.id)) ? (<Button variant="outlined" onClick={e => { e.preventDefault(); block(item.id) }} id={item.id}>Blokiraj</Button>)
                : (<Button variant="outlined" onClick={e => { e.preventDefault(); unblock(item.id) }} id={item.id}>Odblokiraj</Button>)}
            </div>
            </div>
        ))}
        </ul>
    )
}
export default ListFriends;