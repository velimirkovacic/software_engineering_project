import React from 'react'


function LeftPanel() {
    return (
        <div className='outerLeft'>
            <div className='inner'>
                <button className='btnAdd'>Dodaj u kalendar</button>
            </div>
            <div className='inner'>
                <div className='activeUsers'>
                    <h3>Aktivni korisnici</h3>
                    <h4>1.</h4>
                    <h4>2.</h4>
                    <h4>3.</h4>
                </div>
                <div className='promoEvents'>
                    <h3>Istaknuti eventi</h3>
                    <h4>1.</h4>
                    <h4>2.</h4>
                    <h4>3.</h4>
                </div>
            </div>

        </div>
    )
}

export default LeftPanel