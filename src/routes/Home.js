import React, {useState} from 'react';

const Home = () => {
    const [nweet,setNweet] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value);
    }
return(
    <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value = {nweet} type ='text' placeholder='whats your feeling now?' maxLength={120}></input>
            <input type = 'submit' value = 'Nweet'></input>
        </form>
    </div>
    )
}
export default Home;

