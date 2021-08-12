import React from 'react';
import './App.css';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useState } from 'react';

function App() {
  if (firebase.apps.length===0) {
    firebase.initializeApp(firebaseConfig); 
}
  const [newUser,setNewUser]=useState(false);
  const [user,setuser]=useState({
    isSignIn:false,
    name:'',
    email:'',
    password:'',
    photo:''
  });
  // console.log(user);  
  const handleBlur=(e)=>{
    // console.log(e.target.value,e.target.name);
    let isFieldValid= true;
    if (e.target.name==="email") {
      isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name==="password") {
      // must have at least a number, and at least a special character and 6 to 16 valid character
      isFieldValid=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value); 
    }
    if (isFieldValid) {
      // console.log("all valid");
    const newUserInfo={...user};
    newUserInfo[e.target.name]=e.target.value;
      setuser(newUserInfo)
    }
  }
  const handleSubmit=(e)=>{
    console.log(user.email, user.password);
    if (user.email && user.password) {
      console.log("submited");
    }
    e.preventDefault()
  }
  return (
    <div>
        <h1>OUR OWN AHUTENTICATION </h1>
        <p> {`name: ${user.name} email: ${user.email} & password:${user.password}`} </p>
        <form onSubmit={handleSubmit} action="">
        <input type="text" onBlur={handleBlur} name="name" id="" placeholder="your name"/>
        <br />
        <input type="text" onBlur={handleBlur} name="email" id="" placeholder="email" required/>
        <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="password" required/>
        <br />
        <input type="submit" value="Submit" />
        </form> 
    </div>    
  );
}

export default App;




