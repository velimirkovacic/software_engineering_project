import React from 'react';
import '../App';

const welcome = () => {
  return (
    <div classname='welcome'>
        <h2>Račun je uspješno kreiran! Dobrodošli, <span>{user.name}</span></h2>
    </div>
  )
}

export default welcome;