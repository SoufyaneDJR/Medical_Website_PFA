
import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./signup.css"
import axios from 'axios'
import { Link, useHistory, withRouter } from 'react-router-dom';
import * as BiIcons from "react-icons/bi"



function Signup() {

  
    const paperStyle = {padding : 20, height:'80vh', width:500 ,border: '2px solid gray',margin:"0px auto" , display: 'grid',backgroundColor:'rgba(255,255,255,0.6)' }
    const avatarStyle = { backgroundColor: 'gray'}
    const btnStyle = {color:"black", margin:"8px 0px" }

    const [userNameReg, setUserNameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [phone, setPhone] = useState("")
    const [date, setDate] = useState("")
    const [firstName, setFirstNameReg] = useState("")
    const [lastName, setLastNameReg] = useState("")
   
    let validat = false
    const validation=(email)=>{
      let re = /\S+@\S+\.\S+/;  return re.test(email);
     }

    axios.defaults.withCredentials = true
    // create function to send informations to the back-end
    const Register = () => {
      if(firstName===""||lastName===""||userNameReg===""||phone===""||date===""||passwordReg===""||emailReg===""){
        alert("you have to fill all the fields")
        validat=false
      }else{
        if(!validation(emailReg)){
          alert("E-mail Not Valid")
        }else{
          
          validat=true
          axios.post("http://localhost:3002/register",{
            firstName: firstName,
            lastName : lastName,
            username: userNameReg, 
            phone: phone,
            birthday : date,
            password: passwordReg, 
            email: emailReg,
          }).then((response)=>{
            console.log(response)
            if(response.data){
              alert(response.data)
            }
            
          })
        }
        }
        
    }
    

    return (
    
      <div className="signupSection" >
      
      <Grid  >
        <h1 style={{ padding:20}}> <BiIcons.BiLogInCircle/>  CREATE ACCOUNT</h1>
        <Paper elevation={20} style={paperStyle}>
         <Grid style={{padding:'20 auto'}} align='center'>
         <Avatar style={avatarStyle}>
            <LocalHospitalIcon/>
          </Avatar>
          <h3>Sign UP</h3>
         </Grid  >
         <div>
         <TextField style={{margin:10}}  onChange={(e)=>{setFirstNameReg(e.target.value)}}  type="text" label="First Name" variant="standard" placeholder="Enter your first name" required/>        
         <TextField style={{margin:10}}  onChange={(e)=>{setLastNameReg(e.target.value)}}  type="text" label="Last Name" variant="standard" placeholder="Enter your last " required/>
         <TextField style={{margin:10}}  onChange={(e)=>{setUserNameReg(e.target.value)}}  type="text" label="Username" variant="standard" placeholder="Enter your username" required/>        
         <TextField style={{margin:10}}  onChange={(e)=>{setEmailReg(e.target.value)}}  type="text" label="E-mail" variant="standard" placeholder="Enter your E-mail"  required/>
         <TextField style={{margin:10}}  onChange={(e)=>{setPhone(e.target.value)}}  type="number" label="Cell Phone" variant="standard" placeholder="Enter your Phone number"  required/>
         <TextField style={{margin:10 , marginTop:25}}  onChange={(e)=>{setDate(e.target.value)}}  type="date" variant="standard"   required/>
         <TextField style={{margin: 10 , marginLeft: 130}}  onChange={(e)=>{setPasswordReg(e.target.value)}}  type='password' label="Password" variant="standard" placeholder="Enter your password" required/>
         

         </div>     
         <FormControlLabel
          control={ <Checkbox name="checkedB" color=""/> } label="Remember Me"/>
          {!validat?<Link to="signin"><Button  onClick={Register} style={btnStyle} fullWidth variant="contained">Sign up</Button></Link>:
          <Button  onClick={Register} style={btnStyle} fullWidth variant="contained">Sign up</Button>}

        </Paper>
       
      </Grid>
    </div>
  )
}

export default withRouter(Signup) 
