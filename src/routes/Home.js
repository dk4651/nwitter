import React, {useState, useEffect} from 'react';
import { dbService } from 'fbase';
import { addDoc, collection,getDocs } from 'firebase/firestore';

const Home = () => {
    const [nweet,setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

    const getNweets = async() => {
        const dbNweets = await getDocs(collection(dbService,'nweet'));
        dbNweets.forEach((document) => {
            console.log(document)
            const nweetOj = {
                ...document.data(),
                id : document.id
            };

            setNweets(prev => [nweetOj,...prev]);
        }
        )
        
    }

    useEffect(() =>{
        getNweets();

    },[]);

    const onSubmit = async(event) => {
        event.preventDefault();
        await addDoc(collection(dbService,'nweet'),{

            Nweet : nweet,
            CreatedAt : Date.now()
        });
        setNweet('');

    }

    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value);
    }
    //console.log(nweets)

return(

    <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value = {nweet} type ='text' placeholder='whats your feeling now?' maxLength={120}></input>
            <input type = 'submit' value = 'Nweet'></input>
        </form>

        <div>
            {nweets.map((nweet) => (
                <div key = {nweet.id}>
                    <h4>{nweet.Nweet}</h4>
                </div>

            ))}
        </div>
    </div>
    )
}
export default Home;

