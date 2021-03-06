import React from 'react';
import './App.css';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useState } from 'react';

function App() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const [newUser, setNewUser] = useState(false);
  const [user, setuser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    success:false,
    error:''
  });
  console.log(newUser)
  // console.log(user);  
  const handleBlur = (e) => {
    // console.log(e.target.value,e.target.name);
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      // must have at least a number, and at least a special character and 6 to 16 valid character
      isFieldValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value);
    }
    if (isFieldValid) {
      // console.log("all valid");
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setuser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser&& user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
        const newUserInfo={...user};
          newUserInfo.error='';
          newUserInfo.success=true;
          setuser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo={...user};
          newUserInfo.error=error.message;
          newUserInfo.success=false;
          setuser(newUserInfo);
          // console.log(error);
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // console.log(error);
          // ..
        });
      // console.log("submited");
    }
    if (!newUser&& user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo={...user};
        newUserInfo.error='';
        newUserInfo.success=true;
        setuser(newUserInfo);
      })
      .catch((error) => {
        const newUserInfo={...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        setuser(newUserInfo);
      });
    }
    e.preventDefault()
  }
  return (
    <div>
      <h1>OUR OWN AHUTENTICATION </h1>

      <p> {`name: ${user.name} email: ${user.email} & password:${user.password}`} </p>
        <input onClick={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
        <label htmlFor="newUser">New user</label>
      <form onSubmit={handleSubmit} action="">
       {
         newUser &&  <input type="text" onBlur={handleBlur} name="name" id="" placeholder="your name" />
       }
        <br />
        <input type="text" onBlur={handleBlur} name="email" id="" placeholder="email" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="password" required />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p> {user.error} </p>
      {
        user.success && <p style={{color:'green'}}> User {newUser ?"created":"loggedin"} successfully </p>
      }
    </div>
  );
}

export default App;




