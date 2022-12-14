import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home';
import { getLoggedUser } from './service';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  usuarios: store.usuarioState
});

const ProtectedRoute = connect(mapStateToProps)(({ children, usuarios }) => {
  if (!(usuarios || []).find(item => item.loggedIn)) {
    return <Navigate to="/login" replace />;
  }

  return children;
});

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute> }
]);

function App() {

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
