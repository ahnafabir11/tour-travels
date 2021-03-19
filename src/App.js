import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';

export const UserContext = createContext();

const App = ()=> {
  const [userInfo, setUserInfo] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={[userInfo, setUserInfo]}>
        <Router>
          <Header/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/destination/:vehicleName">
              <Destination/>
            </PrivateRoute>
            <PrivateRoute path="/destination">
              <h1 className="text-center text-white py-5">Select One Vehicle From Home Page</h1>
            </PrivateRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;