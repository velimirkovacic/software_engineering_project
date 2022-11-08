import React, {useState} from 'react';
import SingUpForm from './SingUpForm';
import Welcome from './Welcome';

const Form = () => {
    cont [signUpSubmitted, setSignUpSubmitted] = useState(false);

    const submitSignUp = () => {
        setFormSubmitted(true);
    };

 
    return(
        <div>
            {signUpSubmitted ? (
                <SingUpForm submitSignUp={submitSignUp} />
            ) : (
                <Welcome />
            )}

        </div>
    );
};

export default Form;