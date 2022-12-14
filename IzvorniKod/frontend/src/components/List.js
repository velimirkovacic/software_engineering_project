import { React, useState } from 'react'
import data from "./lista.json"
import Button from '@mui/material/Button';

function List(props) {

    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })

    return (
        <ul>
            {filteredData.map((item) => (
                <div className='listItem'>
                    <li key={item.id}>{item.text}
                    </li>
                    <Button variant="contained" className='susp'>SUSPENDIRAJ</Button>

                </div>
            ))}


        </ul>
    )
}

export default List