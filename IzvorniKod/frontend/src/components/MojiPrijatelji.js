import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

function MojiPrijatelji() {

    return (
        <body>
            <div id="container">
                <a>Nazalost nemate prijatelja</a>
                <a href="/">Povratak</a>
            </div>
        </body>
      );
}

export default MojiPrijatelji;