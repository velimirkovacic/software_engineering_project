import { React, useState, useEffect } from 'react'
import "../search.css";
import Button from '@mui/material/Button';


function PromoteDelete(props) {



    function refreshPage() {
        window.location.reload(false);
    }

    function deleteUser(id) {
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
        fetch('/api/user/delete', options)
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


    function promote(id) {
        let roles;
        users.filter((el) => {
            if (el.id === id) {
                console.log("adfsadsadadsa")
                console.log(el.roles)
                roles = el.roles;
            }
        });


        console.log(roles)
        let roleIds = [];
        for (let i = 0; i < roles.length; i++) {
            roleIds.push(roles[i].id)
        }
        roleIds.push(3)

        const data = {
            userId: id,
            roleIds: roleIds
        };
        console.log(data.roleIds)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data)
        };
        console.log(data)
        fetch('/api/user/editroles', options)
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


    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/user/users')
            .then(data => data.json())
            .then(users => {
                setUsers(users.userList)
                console.log(users)
            })
    }, []);

    const filteredData = users.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {

            return el.username.toLowerCase().includes(props.input)
        }
    })

    function alreadyMod(item) {
        let roleIds = [];
        for (let i = 0; i < item.roles.length; i++) {
            roleIds.push(item.roles[i].id)
        }
        console.log(roleIds)

        return roleIds.includes(3);
    }

    return (
        <ul>
            {filteredData.map((item) => (
                <div className='attended'>
                    <li key={item.id}>{item.username}
                    </li>
                    <div className='likes'>
                        <Button name='register' variant="contained" className='susp' onClick={e => { e.preventDefault(); deleteUser(item.id) }} id={item.id}>POBRIŠI</Button>

                        {(alreadyMod(item)) ? <Button hover='Korisnik je vec promoviran' variant="contained" className='susp' disabled={true} id={item.id}>PROMOVIRAJ</Button>

                            : <Button name='register' title='Promoviraj korisnika' variant="contained" className='susp' onClick={e => { e.preventDefault(); promote(item.id) }} id={item.id}>PROMOVIRAJ</Button>
                        }
                    </div>
                </div>
            ))}


        </ul>
    )

}

export default PromoteDelete