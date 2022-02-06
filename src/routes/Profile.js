import React from 'react';
import {getAuth} from 'firebase/auth';
import { authService } from 'fbase';
//import { useHistory } from 'react-router-dom';

const Profile = () => { 
    //const history = useHistory();
    const auth = getAuth;
    const onLogOutClick = () => {
        authService.signOut()
        //history.push('/')
    }


    return(
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    
    )
}

export default Profile;

