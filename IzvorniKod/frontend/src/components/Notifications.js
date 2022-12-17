import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

function Notifications() {

    function povratak() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        fetch('/', options)
            .then(response => {
                console.log(response)
            });
    }

    return (
        <body>
            <div id="container">
                <a>Nemate novih obavijesti</a>
                <a href="/" onClick={povratak}>Povratak</a>
            </div>
        </body>
      );
}

export default Notifications;