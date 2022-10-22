import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home';
import { getLoggedUser } from './service';

function App(props) {

  const [loggedIn, setLoggedIn] = useState();

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }
  
  useEffect(() => {
    document.addEventListener("login", handleLogin);
    document.addEventListener("logout", handleLogout);

    setLoggedIn(getLoggedUser());
    return () => {
      document.removeEventListener("login", handleLogin);
      document.removeEventListener("logout", handleLogout);
    }
  }, []);

  return (
    <>
      {loggedIn && <Home />}
      {!loggedIn && <Login />}
    </>
  );
}

export default App;
