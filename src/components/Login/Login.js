import './Login.css';
import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config.js';
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import { TextField, Button } from '@material-ui/core';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function Login() {
  const [, setUserInfo] = useContext(UserContext);
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    fullname: '',
    photoURL: '',
    errorMessage: '',
  })

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // toggle sign up and sign in
  const handleCreateAccountSate = ()=> {
    setIsNewAccount(!isNewAccount);
  }

  // add date from input to user state
  const handleFormField = (e) => {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  }

  // sign up with email and password
  const handleSignUp = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(user.email);
    const isPassValid = user.password?.length > 7;
    const isNameValid = user.fullname?.length > 7;

    if (isEmailValid && isPassValid && isNameValid) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUser = { ...user };
          newUser.errorMessage = '';
          // update displayName
          const currentUser = firebase.auth().currentUser;
          currentUser.updateProfile({ displayName: user.fullname })
            .catch(function (error) {
              const newUser = { ...user };
              newUser.errorMessage = error.message;
              setUser(newUser);
            });
          setUser(newUser);
          setUserInfo(user);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newUser = { ...user };
          newUser.email = '';
          newUser.errorMessage = errorMessage;
          setUser(newUser);
        });
    } else {
      const newUser = { ...user };
      newUser.errorMessage = 'your email, fullname, password in not in correct formate !';
      setUser(newUser);
    }
  }

  // sign in with email and password
  const signInWithEmail = () => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const userResult = res.user;
        const newUser = { ...user };
        newUser.fullname = userResult.displayName;
        newUser.email = userResult.email;
        newUser.photoURL = userResult.photoURL;
        setUser(newUser);
        setUserInfo(newUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUser = { ...user };
        newUser.email = '';
        newUser.errorMessage = errorMessage;
        setUser(newUser);
        setUserInfo(newUser);
      });
  }

  // sign in with google
  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
      .then((res) => {
        const providedData = res.user;
        const newUser = { ...user };
        newUser['fullname'] = providedData.displayName;
        newUser['email'] = providedData.email;
        newUser['photoURL'] = providedData.photoURL;
        newUser['errorMessage'] = '';
        setUser(newUser);
        setUserInfo(newUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUser = { ...user };
        newUser.email = '';
        newUser.errorMessage = errorMessage;
        setUser(newUser);
        setUserInfo(newUser);
      });
  }

  // sign in with github
  const signInWithGitHub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(githubProvider)
      .then((result) => {
        const userResult = result.user;
        const newUser = { ...user };
        newUser['fullname'] = userResult.displayName;
        newUser['email'] = userResult.email;
        newUser['photoURL'] = userResult.photoURL;
        newUser['errorMessage'] = '';
        setUser(newUser);
        setUserInfo(newUser);
        history.replace(from);
      }).catch((error) => {
        const errorMessage = error.message;
        const newUser = { ...user };
        newUser.email = '';
        newUser.errorMessage = errorMessage;
        setUser(newUser);
        setUserInfo(newUser);
      });
  }
  
  return (
    <div className="Login">
      <div className="container">
        <h3 className="text-center text-white py-4">
        {isNewAccount ? 'Create New Account' : 'Log In to you Account'}
        </h3>
        <div className="card card-body login-card">
          {isNewAccount &&
            <TextField
              className="sign-inUp-input my-3"
              label="Full Name"
              variant="outlined"
              name="fullname"
              onChange={handleFormField}
            />}
          <TextField
            className="sign-inUp-input my-3"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleFormField}
          />
          <TextField
            className="sign-inUp-input my-3"
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleFormField}
          />
          {isNewAccount ?
            <Button variant="contained" size="large" color="primary" className="my-3" onClick={handleSignUp}>SIGN UP</Button> :              
            <Button variant="contained" size="large" color="primary" className="my-3" onClick={signInWithEmail}>SIGN IN</Button>
          }
        <p className="text-center">
          {isNewAccount ? "already have an account?" : "don't have an account?"}
          <Button onClick={handleCreateAccountSate}>
            {isNewAccount ? "LOG IN" : "SIGN UP"}
          </Button>
        </p>
        <p className="text-center text-danger">{user.errorMessage}</p>
        </div>

        <div className="my-2 d-flex align-items-center justify-content-center">
          <p className="text-white px-2 flex-1 py-0">OR SIGN IN WITH</p>
        </div>
          
        <div className="card card-body" id="button-card">
          <Button 
            variant="contained" 
            size="large" 
            color="primary" 
            id="social-login-btn"
            onClick={handleGoogleSignIn}>
          <span id="custom-text"><FcGoogle/></span>Google
          </Button>
          <Button 
            variant="contained" 
            size="large" 
            color="primary" 
            id="social-login-btn"
            onClick={signInWithGitHub}>
            <span id="custom-text"><VscGithubInverted /></span>GitHub
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login;