import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';


function ListFriends(props) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/user/users')
           .then(data => data.json())
           .then(users => {
               setUsers(users.userList)
                console.log(users)
            })
    }, []);

    console.log(users);
    const filteredData = users.filter((el) => {
        if (props.input === '') {
            return el;
        }
        else {
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
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                    })
                }
            })
        refreshPage()        
    }

    /* za kad ćemo htjeti blokirati korisnike
    <Button variant="outlined" onClick={e => { e.preventDefault(); block(item.id) }} id={item.id}>Blokiraj</Button>
    function block(id) {
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
        console.log(data)
        fetch('/api/user/block', options)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                    })
                }
            })
        refreshPage()
    }
    */

    return (
        <ul>
        {filteredData.map((item) => (
            <div className='listItem'>
                <li key={item.id}>{item.username}</li>
                <Button variant="contained" onClick={e => { e.preventDefault(); friend(item.id) }} id={item.id}>Dodaj</Button>
            </div>
        ))}
        </ul>
    )
}
export default ListFriends;