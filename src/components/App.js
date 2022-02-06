import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
   
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const auth = getAuth();
  //console.log(authService.currentUser)
  //setInterval(() => console.log(authService.currentUser),2000)
  
  //만약 초기화나 Auth.에 변화이벤트가 있을 경우 
  //init을 true로 변경하고 isLoggedIn에 currentUser 정보를 넣어라 
  //변화가 없다면 init은 false를 유지한다 
  const AuthChanged = () => {
    let user;
    onAuthStateChanged(auth,(user) => {
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      console.log(isLoggedIn)
      setInit(true);}
      );
  }
  useEffect(AuthChanged, []);

  
  return (
  <>
    {init ? <AppRouter isLoggedIn = {isLoggedIn}/> :'initializing...'}
  <footer>
    &copy; {new Date().getFullYear()} Nwitter
  </footer>
  </>
  );
}

export default App;
