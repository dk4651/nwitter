import React, {useState, useEffect} from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import NNweet from 'components/Nweet'

const Home = ({userObj}) => {
    
    //console.log(userObj)
    const [nweet,setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

    //const getNweets = async() => {
    //    const dbNweets = await getDocs(collection(dbService,'nweet'));
    //   dbNweets.forEach((document) => {
    //        //console.log(document)
    //        const nweetOj = {
    //            ...document.data(),
    //            id : document.id,
    //            
    //        };
    
    //        setNweets(prev => [nweetOj,...prev]);
    //    }
    //    )
        
    //}

    useEffect(() =>{
        //getNweets();
        onSnapshot(collection(dbService,'nweet'),snapshot =>{
        //    console.log(snapshot.docs)
        const nweetArray = snapshot.docs.map((doc) => ({id:doc.id,...doc.data()}));
        
        setNweets(nweetArray);  
        })
        

    },[]);

    const onSubmit = async(event) => {
        event.preventDefault();
        await addDoc(collection(dbService,'nweet'),{

            text : nweet,
            CreatedAt : Date.now(),
            creatorId : userObj.uid
        });
        setNweet('');

    }

    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value);
    }
    //
    
return(

    <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value = {nweet} type ='text' placeholder='whats your feeling now?' maxLength={120}></input>
            <input type = 'submit' value = 'Nweet'></input>
        </form>

        <div>
            {nweets.map((nweet) => (
                <NNweet key = {nweet.id} nweetObj = {nweet} isOwner = {nweet.creatorId===userObj.uid} />
            ))}
        </div>
    </div>
    )
}
export default Home;

