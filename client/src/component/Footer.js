import React, { useState } from 'react'
import "./footer.css" ;
import * as FaIcons from "react-icons/fa"
import * as BiIcons from "react-icons/bi"
import * as SiIcons from "react-icons/si"
import * as RiIcons from "react-icons/ri"
import * as GiIcons from "react-icons/gi"
import * as GrIcons from "react-icons/gr"

import * as FiIcons from "react-icons/fi"
import * as ImIcons from "react-icons/im"
import { Button, GridListTileBar, TextField } from '@material-ui/core';
import axios from 'axios';




function Footer() {
  const [fullName, setfullName] = useState("")
  const [email, setemail] = useState("")
  const [message, setmessage] = useState("")

 
  const sendMessage=()=>{
    if(fullName == '' || message=='' || email==""){
      alert("you have to fill all the text fields")
    }else{
      if(!validation(email)){
        alert("wrong email combination")
      }else{
        setfullName("")
        setmessage("")
        setemail("")
        axios.post("http://localhost:3002/send",{
          fullName : fullName,
          email : email ,
          message : message
        }).then((res)=>{
          
          console.log(res);
        })
      }
      
    }
  }
//Regex
 const validation=(email)=>{
  let re = /\S+@\S+\.\S+/;  return re.test(email);
 }

  const btnStyle = {color:"white", backgroundColor:'yellowgreen' , textAlign: 'center'}

  return (
    <section className="contact">
      <div className="content">
        <h2>Contact US</h2>
        <p>we are a first year student at ENSIAS , and we tried to make this website to offre you a few services</p>
      </div>
      <div className="container">
        <div className="contactInfo">
          <div className="box">
              <div className="icon"><GrIcons.GrLocation style={{fontSize:30}}/> </div>
              <div className="text">
                  <h4 style={{marginLeft:10}}>Adress :</h4>
                  <p style={{color: 'white'}}>Oujda, Maroc</p>
              </div>
          </div>
          <div className="box">
              <div className="icon"><FiIcons.FiMail style={{fontSize:30}} /> </div>
              <div className="text">
                  <h4 style={{marginLeft:10}}> E-mail :</h4>
                  <p style={{color: 'white'}}>ouiamhich@gmail.com</p>
                  <p style={{color: 'white'}}>soufyan@gmail.com</p>
              </div>
          </div>
          <div className="box">
              <div className="icon"> <BiIcons.BiPhoneCall style={{fontSize:30}}/></div>
              <div className="text">
                  <h4 style={{marginLeft:10}}> Phone :</h4>
                  <p style={{color: 'white'}}>06 89 44 48 67</p>
                  <p style={{color: 'white'}}>06 89 44 48 67</p>
              </div>
          </div>
        </div>
        <div className="contactForm">
          <form noValidate>
            <h2>Send Message</h2>
             <div className="inputBox">
             <TextField value={fullName} onChange={(e)=>{setfullName(e.target.value)}} style={{margin:"10px auto"}} label="Full Name" variant="standard" placeholder="Enter your full name" fullWidth required/>
             </div>
             <div className="inputBox">
             <TextField value={email}  onChange={(e)=>{setemail(e.target.value)}} style={{margin:"10px auto"}}  label="E-mail" variant="standard" placeholder="Enter your email" fullWidth required/>
             </div>
             <div className="inputBox">
             <TextField  type="email" value={message} onChange={(e)=>{setmessage(e.target.value)}} style={{margin:"10px auto"}} label="message" variant="standard" placeholder="Enter your mesage" fullWidth required/>
             </div>
             <div className="inputBox">
                <Button  onClick={sendMessage} style={btnStyle} variant="contained">Send</Button>
             </div>
          </form>
        </div>
      </div>
    </section>

   
  )
}

export default Footer
