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
    
  });
  const handleBlur=(e)=>{
    console.log(e.target.value,e.target.name);
    if (e.target.name==="email") {
      const isValid=/\S+@\S+\.\S+/.test(e.target.value);
      console.log(isValid);
    }
    if (e.target.name==="password") {
      // must have at least a number, and at least a special character and 6 to 16 valid character
      const isPasswordValid=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value)
      console.log(isPasswordValid);
    }
  }
  const handleSubmit=()=>{
    console.log("submited");
  }
  return (
    <div>
        <h1>OUR OWN AHUTENTICATION </h1>

        <form onSubmit={handleSubmit} action="">
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




