import { React, useState } from 'react';
import TextField from "@mui/material/TextField";
import List from "./components/List"
import "./search.css";
import Navbar from './components/Navbar';

function UserActions() {

    const [inputText1, setInputText1] = useState("");
    let inputHandler1 = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText1(lowerCase);
    };



    return (
        <div>
            <Navbar />
            <div className='sus'>
                <div className='main'>
                    <h1 style={{marginTop: '20px'}}> Upravljaj korisnicima</h1>
                    <div className="search">
                        <TextField
                            id="outlined-basic"
                            onChange={inputHandler1}
                            variant="outlined"
                            fullWidth
                            label="Search"
                        />
                    </div>
                    <List input={inputText1} />
                </div>
            </div>

        </div>
    );
}

export default UserActions