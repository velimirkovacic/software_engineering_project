import { React, useState, useEffect } from 'react'


import Button from '@mui/material/Button';


function List(props) {
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

    return (
        <ul>
            {filteredData.map((item) => (
                <div className='listItem'>
                    <li key={item.id}>{item.username}
                    </li>
                    <Button variant="contained" className='susp'>SUSPENDIRAJ</Button>

                </div>
            ))}


        </ul>
    )

}

export default List