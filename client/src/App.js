import React, { useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import CreatePost from "./components/CreatePost/CreatePost";
import { loadUser } from './redux/UserReducer/Actions';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import UserProfile from './components/UsersProfile/UserProfile';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <Router>
      <Route exact path="/" component={Landing}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/createpost" component={CreatePost}/>
      <Route path="/userProfile/:id" component={UserProfile}/>
    </Router>
  );
}

export default App;
