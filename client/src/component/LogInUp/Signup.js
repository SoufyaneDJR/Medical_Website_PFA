
import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {GoogleLogin} from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import "./signup.css"
import axios from 'axios'
import { Link, useHistory, withRouter } from 'react-router-dom';


function Signup() {

  
    const paperStyle = {padding : 20, height:'80vh', width:350 ,border: '2px solid gray',margin:"20px auto"}
    const avatarStyle = { backgroundColor: 'gray'}
    const btnStyle = {color:"black", margin:"8px 0px" }

    const [userNameReg, setUserNameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")

    axios.defaults.withCredentials = true
    // create function to send informations to the back-end
    const Register = () => {
        axios.post("http://localhost:3002/register",{
          username: userNameReg, 
          password: passwordReg, 
          email: emailReg,
        }).then((response)=>{
          console.log(response)
          
        })
    }
    
    const responseGoogle=(response)=>{
      console.log(response);
      console.log(response.profilObj);
    }

    const responseFacebook = (response) => {
      console.log(response);
    } 

  return (
    
      <div>
      <Grid  >
        
        <Paper elevation={10} style={paperStyle}>
         <Grid style={{padding:'20 auto'}} align='center'>
         <Avatar style={avatarStyle}>
            <LocalHospitalIcon/>
          </Avatar>
          <h3>Sign UP</h3>
         </Grid  >

         <TextField onChange={(e)=>{setUserNameReg(e.target.value)}}  type="text" label="Username" variant="standard" placeholder="Enter your username" fullWidth required/>        
         <TextField onChange={(e)=>{setEmailReg(e.target.value)}}  type="text" label="E-mail" variant="standard" placeholder="Enter your E-mail" fullWidth required/>
         <TextField onChange={(e)=>{setPasswordReg(e.target.value)}}  type='password' label="Password" variant="standard" placeholder="Enter your password" fullWidth required/>
                 
         <FormControlLabel
          control={ <Checkbox name="checkedB" color=""/> } label="Remember Me"/>
          <Link to="signin"><Button  onClick={Register} style={btnStyle} fullWidth variant="contained">Sign up</Button></Link>
      
        <div className="google-Login"> 
        <GoogleLogin
          clientId="934975783401-0dmi242184gi8oo0eheq9ripneo297kl.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />   
        </div>

        <div className="facebook-login">
        <FacebookLogin
          appId="2868856460098325"
          autoLoad={true}
          fields="name,email,picture"
          //onClick={componentClicked}
          callback={responseFacebook} />,
        </div>

        </Paper>
      </Grid>
    </div>
  )
}

export default withRouter(Signup) 
