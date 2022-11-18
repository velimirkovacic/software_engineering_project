import React from 'react'
import { useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
function Dropdown({ selected, setSelected }) {

    const [isActive, setIsActive] = useState(false);
    const events = ['Prijatna kafica s ekipom', 'Rasprava o Norveškom drvu']
    return (
        <div className='dropdown'>
            <div className='dropdown-btn' onClick={(e) =>
                setIsActive(!isActive)}>
                {selected}
                <MdArrowDropDown />
            </div>
            {isActive && (
                <div className='dropdown-content'>
                    {events.map(event => (
                        <div
                            onClick={(e) => {
                                setSelected(event);
                                setIsActive(false)
                            }}
                            className='dropdown-item' > {event}
                        </div>
                    ))}

                </div>
            )
            }
        </div >
    );
}

export default Dropdown