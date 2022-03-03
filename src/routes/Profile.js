import React, { useEffect } from 'react';
import {getAuth} from 'firebase/auth';
import { authService, dbService } from 'fbase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
//import { useHistory } from 'react-router-dom';

const Profile = ({userObj}) => { 

    //const history = useHistory();
    const auth = getAuth;
    const onLogOutClick = () => {
        authService.signOut()
        //history.push('/')
    }

    const getMyNweets = async() => {
        const dbRef =  collection(dbService,'nweet');
        const q = query(dbRef,where('creatorId','==', `${userObj.uid}`),orderBy('CreatedAt'))
        const nweets = await getDocs(q)
        nweets.docs.map(doc => console.log(doc.data()))
       
    }
    useEffect(getMyNweets,[])

    return(
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    
    )
}

export default Profile;

