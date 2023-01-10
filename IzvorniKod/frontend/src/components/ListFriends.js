import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';


function ListFriends(props) {
    const [users, setUsers] = useState([]);
    const [userIds, setUserIds] = useState([]);
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

    //svi korisnici
    useEffect(() => {
        fetch('/api/user/users')
           .then(data => data.json())
           .then(users => {
               setUsers(users.userList)
               console.log("OVO")
               console.log(users.userList)

               const helpArray = []
                users.userList.map(user => helpArray.push(user.id))
                setUserIds(helpArray)
            })
    }, []);

    const filteredData = users.filter((el) => {
        const frendovi = []
        props.listaFrendova.map(frend => frendovi.push(frend.id))
        if (props.input === '' && !frendovi.includes(el.id)) {
            return el;
        }
        else if (!frendovi.includes(el.id)){
            return (el.username.toLowerCase().includes(props.input) || el.nickname.toLowerCase().includes(props.input))
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
        
        const helpArray = []
        props.listaFrendova.map(user => helpArray.push(user))
        helpArray.push(users[userIds.indexOf(id)])
        props.setFriends(helpArray)
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

        const helpArray = []
        blocked.map(user => helpArray.push(user))
        helpArray.push(id)
        setBlocked(helpArray)
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
        
        const helpArray = []
        blocked.map(user => helpArray.push(user))
        helpArray.splice(blocked.indexOf(id), 1)
        setBlocked(helpArray)
    }

    return (
        <ul>
        {filteredData.map((item) => (
            <div className='attended'>
                <div className='block'>
                <li key={item.id}>{item.nickname}<span style={{color: 'grey'}}>{' @' + item.username}</span></li>
                </div>
                <div className='search' style={{width: '300px'}}>
                <Button variant="contained" onClick={e => { e.preventDefault(); friend(item.id) }} id={item.id}>Dodaj</Button>
                {(!blocked.includes(item.id)) ? (<Button variant="outlined" onClick={e => { e.preventDefault(); block(item.id) }} id={item.id}>Blokiraj</Button>)
                : (<Button variant="outlined" onClick={e => { e.preventDefault(); unblock(item.id) }} id={item.id}>Odblokiraj</Button>)}
            </div>
            </div>
        ))}
        <div style={{marginBottom: '40px'}}></div>
        </ul>
    )
}
export default ListFriends;