import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

function Notifications() {

    return (
        <body>
            <div id="container">
                <a>Nemate novih obavijesti</a>
                <a href="/">Povratak</a>
            </div>
        </body>
      );
}

export default Notifications;