import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

function ProfileInfo() {

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
            <div>
            <a>OVO JE VAŠ PROFIL</a>
            <a href="/" onClick={povratak}>Povratak</a>
            </div>
      );
}

export default ProfileInfo;