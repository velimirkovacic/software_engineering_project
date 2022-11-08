import React from 'react'
import { useState } from 'react'
import Dropdown from './Dropdown'

function RightPanel() {
    const [selected, setSelected] = useState("Izbornik");
    return (
        <div className='outerRight'>
            <div className='innerRight'>
                <h2>Javni eventi</h2>
                <Dropdown selected={selected} setSelected={setSelected} />
            </div>



        </div>
    )
}

export default RightPanel