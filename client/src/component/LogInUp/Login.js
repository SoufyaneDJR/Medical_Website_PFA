import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@material-ui/core'
import React,{useState , useEffect} from 'react'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
import { withRouter } from 'react-router';
import "../LogInUp/login.css"
import * as BiIcons from "react-icons/bi"


function Login() {


  const paperStyle = { padding : 20, height:'67vh', width:350, margin:'0px auto' ,border: '2px solid yellowgreen'}
  const avatarStyle = { backgroundColor: 'yellowgreen'}
  const btnStyle = {color:"black", margin:"8px 0px" , backgroundColor:'yellowgreen'}
  

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [LoginStatus, setLoginStatus] = useState("")

  axios.defaults.withCredentials = true
  
  const SignIn = () =>{
    axios.post("http://localhost:3002/login",{
      username : username,
      password : password,
    }).then((response)=>{
      if(response.data.message){

        setLoginStatus(response.data.message);
        
      }else{
        setLoginStatus(response.data[0].username);
      }
      window.location.reload()
    })
  }

  useEffect(() => {
    axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      
      }
    });
  }, []);
  

  return (
      <section style={{height:"100vh"}} className="loginSection">
       <div >
         <h1 style={{color:'white',padding:30}}><BiIcons.BiLogInCircle/> Sign In With Your Account </h1>
          <Paper elevation={10} style={paperStyle}>
          <Grid  align='center'>
           <Avatar style={avatarStyle}>
              <LocalHospitalIcon/>
            </Avatar>
            <h3>Sign in</h3>
          </Grid  >

          <TextField name="username" style={{paddingTop:10}} onChange={(e)=>{setUsername(e.target.value)}} label="Username" variant="standard" placeholder="Enter your username" fullWidth required/>        
          <TextField name="password" onChange={(e)=>{setPassword(e.target.value)}} type='password' label="Password" variant="standard" placeholder="Enter yout password" fullWidth required/>
          
          <FormControlLabel control={<Checkbox name="checkedB"  color="primary"/>} label="Remember Me"/>
          <Button onClick={SignIn}  style={btnStyle} fullWidth variant="contained">Sign In</Button>
            <Typography>
            </Typography>
            <Typography  style={{margin :"-8px" }}> Do you have an account ? 
              <Link href="signup">
              Sign Up
              </Link>
           </Typography>
           
          </Paper>
          <h1> status :{LoginStatus}</h1>
          </div>
        
      </section>
  )
}

export default withRouter(Login);
