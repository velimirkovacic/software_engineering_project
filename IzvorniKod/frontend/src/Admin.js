import { React, useState } from 'react'
import TextField from "@mui/material/TextField";
import Navbar from './components/Navbar';
import PromoteDelete from './components/PromoteDelete';
import "./search.css";
function Admin() {

    const [inputText, setInputText] = useState("");
    let inputHandler1 = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };





    return (
        <div>
            <Navbar />
            <div className='promoDel'>
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        onChange={inputHandler1}
                        variant="outlined"
                        fullWidth
                        label="Search"
                    />
                </div>
                <PromoteDelete input={inputText} />
            </div>
        </div>
    )
}

export default Admin