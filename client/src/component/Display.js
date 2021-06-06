import axios from 'axios';
import React, { useState , useEffect} from 'react'
import "./Display.css"

export default function Display() {

 const [firstName, setfirstName] = useState("")
 const [lastName, setlastName] = useState("")
 const [userName, setuserName] = useState("")
 const [phone, setphone] = useState("")
 const [birthday, setbirthday] = useState("")
 const [email, setemail] = useState("")
 const Hstyle= {color:'white', fontSize:19}


 axios.defaults.withCredentials = true
 
  axios.get("http://localhost:3002/login").then((response)=>{
    console.log(response);
  })

 useEffect(() => {
   axios.get("http://localhost:3002/login").then((response) => {
     if (response.data.loggedIn == true) {
       setuserName(response.data.user[0].username);
       setfirstName(response.data.user[0].firstName);
       setlastName(response.data.user[0].lastName);
       setemail(response.data.user[0].email);
       setphone(response.data.user[0].phone);
       setbirthday(response.data.user[0].birthday);
     
     }
   });
 }, []);

  return (
   <>
   <div className="containerProfil">

   <div className="listProfil">
   <ul>
     
     <h2 style={Hstyle}>User Name : {userName}</h2>
     
     <h2 style={Hstyle}>first Name : {firstName} </h2>
     <h2 style={Hstyle} >last Name : {lastName}  </h2>
     <h2 style={Hstyle}>Email :{email}</h2>
     <h2 style={Hstyle}>Phone Number : {phone}  </h2>
     <h2 style={Hstyle}>Birthday :  {birthday} </h2>
   </ul>

   </div>
   
      <img className="containerImage" style={{maxWidth:"35%"}} src="profil.png"/>
      
   
   </div>
   </>
      )
}
