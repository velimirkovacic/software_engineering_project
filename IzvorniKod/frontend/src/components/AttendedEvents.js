import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

function AttendedEvents() {

    return (
            <div>
            <a>Niste bili niti na jednom eventu</a>
            <a href="/">Povratak</a>
            </div>
      );
}

export default AttendedEvents;