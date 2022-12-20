import { React, useState, useEffect } from 'react'


import Button from '@mui/material/Button';


function ListUnsuspend(props) {

    function refreshPage() {
        window.location.reload(false);
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
        if (props.input === '' && el.suspended === true) {
            return el;
        }
        //return the item which contains the user input
        else {
            if (el.suspended === true)
                return el.username.toLowerCase().includes(props.input)
        }
    })

    return (
        <ul>
            {filteredData.map((item) => (
                <div className='listItem'>
                    <li key={item.id}>{item.username}
                    </li>
                    <Button variant="contained" className='susp' onClick={e => { e.preventDefault(); unsuspend(item.id) }} id={item.id}>ODSUSPENDIRAJ</Button>

                </div>
            ))}


        </ul>
    )

}

export default ListUnsuspend