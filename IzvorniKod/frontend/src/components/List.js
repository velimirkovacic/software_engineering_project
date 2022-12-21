import { React, useState, useEffect } from 'react'
import Button from '@mui/material/Button';


function List(props) {

    function refreshPage() {
        window.location.reload(false);
    }


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

    function alreadyMod(item) {
        let roleIds = [];
        for (let i = 0; i < item.roles.length; i++) {
            roleIds.push(item.roles[i].id)
        }
        console.log(roleIds)

        return roleIds.includes(3);
    }



    function suspend(id) {
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
        fetch('/api/user/suspend', options)
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

    function unsuspend(id) {
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
        fetch('/api/user/unsuspend', options)
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


    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/user/users')
            .then(data => data.json())
            .then(users => {
                setUsers(users.userList)
                console.log(users)
            })
        getUserData()
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



    return (

        <ul>
            {filteredData.map((item) => (
                <div className='attended'>
                    <li key={item.id}>{item.username}
                    </li>
                    <div className='likes'>


                        <Button style={{ width: '160px' }} type="button" name='dislike' variant="contained" className='susp' disabled={item.suspended === true ? true : false} onClick={e => { e.preventDefault(); suspend(item.id) }} id={item.id}>SUSPENDIRAJ</Button>
                        <Button style={{ width: '200px' }} name='register' variant="contained" className='susp' disabled={item.suspended === false ? true : false} onClick={e => { e.preventDefault(); unsuspend(item.id) }} id={item.id}>ODSUSPENDIRAJ</Button>
                        {(userData.admin === true) ?
                            <>
                                <Button style={{
                                    backgroundColor: "#3f3d3ded",
                                    marginLeft: '80px'
                                }} type="button" name='register' variant="contained" className='susp' onClick={e => { e.preventDefault(); deleteUser(item.id) }} id={item.id}>Obriši</Button>
                                <Button name='promoviraj' variant="contained" className='susp' disabled={alreadyMod(item) === true ? true : false} onClick={e => { e.preventDefault(); promote(item.id) }} id={item.id}>Promoviraj</Button>
                            </> : ''
                        }

                    </div>
                </div>
            ))
            }


        </ul >
    )

}

export default List