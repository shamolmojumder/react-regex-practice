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




