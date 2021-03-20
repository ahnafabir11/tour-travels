import './Login.css';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { TextField, Button } from '@material-ui/core';
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import { UserContext } from '../../App';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from '../../firebase.config.js';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Login = ()=> {
  const [, setUserInfo] = useContext(UserContext);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [isFieldValid, setIsFieldValid] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    fullname: '',
    errorMessage: '',
  })

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // toggle sign up and sign in
  const handleCreateAccount = ()=> {
    setIsNewAccount(!isNewAccount);
  }

  // add date from input to user state
  const handleFormField = (e)=> {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);

    if(e.target.name === 'fullname'){
      setIsFieldValid(e.target.value > 5);
    }
    if (e.target.name === 'email') {
      const re = /\S+@\S+\.\S+/;
      setIsFieldValid(re.test(e.target.value));
    }
    if (e.target.name === 'password') {
      const re = /[a-z]\d|\d[a-z]/i;
      setIsFieldValid(re.test(e.target.value));
    }
  }

  // sign up with email and password
  const handleSignUp = () => {
    if (isFieldValid) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUser = { ...user };
        setUser(newUser);
        setUserInfo(user);
        updateDisplayName();
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUser = { ...user };
        newUser.errorMessage = errorMessage;
        setUser(newUser);
      });
    } else {
      const newUser = { ...user };
      newUser.errorMessage = 'email or fullname or password is not in correct formate !';
      setUser(newUser);
    }
  }

  const updateDisplayName = ()=> {
    const currentUser = firebase.auth().currentUser;
    currentUser.updateProfile({ displayName: user.fullname })
      .catch(function (error) {
        const newUser = { ...user };
        newUser.errorMessage = error.message;
        setUser(newUser);
      });
  }

  // sign in with email and password
  const signInWithEmail = () => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const userResult = res.user;
        const newUser = { ...user };
        newUser['fullname'] = userResult.displayName;
        newUser['email'] = userResult.email;
        setUser(newUser);
        setUserInfo(newUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUser = { ...user };
        newUser['errorMessage'] = errorMessage;
        setUser(newUser);
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
      history.push(from);
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUser = { ...user };
      newUser['errorMessage'] = errorMessage;
      setUser(newUser);
    });
  }

  // sign in with github
  const handleGithubSignIn = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(githubProvider)
    .then((result) => {
      const userResult = result.user;
      const newUser = { ...user };
      newUser['fullname'] = userResult.displayName;
      newUser['email'] = userResult.email;
      newUser['errorMessage'] = '';
      setUser(newUser);
      setUserInfo(newUser);
      history.replace(from);
    }).catch((error) => {
      const errorMessage = error.message;
      const newUser = { ...user };
      newUser['errorMessage'] = errorMessage;
      setUser(newUser);
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
              className="sign-inUp-input my-1"
              label="Full Name"
              variant="outlined"
              name="fullname"
              helperText="name should atleast 5 character"
              required
              onChange={handleFormField}
            />}
          <TextField
            className="sign-inUp-input my-1"
            label="Email"
            variant="outlined"
            name="email"
            helperText="email must be valid"
            required
            onChange={handleFormField}
          />
          <TextField
            className="sign-inUp-input my-1"
            label="Password"
            variant="outlined"
            name="password"
            helperText="password should have 1 letter and 1 number and atleast 6 character"
            required
            onChange={handleFormField}
          />
          {isNewAccount ?
            <Button variant="contained" size="large" color="primary" className="my-3" onClick={handleSignUp}>SIGN UP</Button> :              
            <Button variant="contained" size="large" color="primary" className="my-3" onClick={signInWithEmail}>SIGN IN</Button>
          }
        <p className="text-center">
          {isNewAccount ? "already have an account?" : "don't have an account?"}
          <Button onClick={handleCreateAccount}>
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
            onClick={handleGithubSignIn}>
            <span id="custom-text"><VscGithubInverted /></span>GitHub
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login;