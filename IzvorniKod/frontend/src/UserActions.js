import { React, useState } from 'react';
import TextField from "@mui/material/TextField";
import List from "./components/List"
import "./search.css";
import ListUnsuspend from './components/ListUnsuspend';
import Navbar from './components/Navbar';

function UserActions() {

    const [inputText1, setInputText1] = useState("");
    let inputHandler1 = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText1(lowerCase);
    };

    const [inputText2, setInputText2] = useState("");
    let inputHandler2 = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText2(lowerCase);
    };

    return (
        <div>
            <Navbar />
            <div className='sus'>
                <div className='main'>
                    <h1>Suspendiraj korisnika</h1>
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
                <div className='main'>
                    <h1>Suspendirani korisnici</h1>
                    <div className="search">
                        <TextField
                            id="outlined-basic"
                            onChange={inputHandler2}
                            variant="outlined"
                            fullWidth
                            label="Search"
                        />
                    </div>
                    <ListUnsuspend input={inputText2} />
                </div>
            </div>

        </div>
    );
}

export default UserActions