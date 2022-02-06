import React, {useState} from 'react';
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setnewAccount] = useState(true);
    const [err, setErr] = useState('');

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
        const auth = getAuth();
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
        <button>Continue with Google</button>
        <button>Continue with Github</button>
     </div>


     </div>
    );
};
export default Auth;
