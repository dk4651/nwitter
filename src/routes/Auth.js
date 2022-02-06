import React, {useState} from 'react';
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,GithubAuthProvider} from 'firebase/auth';


const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setnewAccount] = useState(true);
    const [err, setErr] = useState('');
    const auth = getAuth();

    const onChange = (event) => {
        console.log(event.target.name);
        const {target : {name, value}} = event;
        if (name === 'email'){
            setEmail(value);
        } else if (name === 'password'){
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let data;
        try{
            if(newAccount) {
                data = await createUserWithEmailAndPassword(auth,email,password)
            }else{
                data = await signInWithEmailAndPassword (auth, email, password);
            }
            console.log(data)
        }catch(error){
            setErr(error.message)
        }

    };
    const toggleAccount = () => setnewAccount((prev) => !prev);
        //console.log({newAccount})
        //if (newAccount === false){
        //    setnewAccount(true)
        //}else{
        //    setnewAccount(false)
        //}

    const onSocialClick = async (event) => {
        const {target : {name}} = event;
        let provider;
        if(name === 'google'){
            provider = new GoogleAuthProvider();

        }else if(name === 'github'){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(auth,provider);
        console.log(data);
    }


    return(
    <div>
        <form onSubmit = {onSubmit}>
            <input name = 'email' type='email' placeholder ='Email' required value ={email} onChange = {onChange}/>
            <input name = 'password' type='password' placeholder = 'password' required value={password} onChange = {onChange}/>
            <input type='submit' value = {newAccount ? 'Create Account' : 'Log In'} />
            {err}
        </form>
     <div>
         <div onClick = {toggleAccount}>{newAccount ? 'Create Account' : 'Log In'}</div>
        <button name='google' onClick={onSocialClick}>Continue with Google</button>
        <button name='github'onClick={onSocialClick}>Continue with Github</button>
     </div>


     </div>
    );
};
export default Auth;
