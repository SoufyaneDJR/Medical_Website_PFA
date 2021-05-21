import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@material-ui/core'
import React,{useState , useEffect} from 'react'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
import { withRouter } from 'react-router';



function Login() {


  const paperStyle = {padding : 20, height:'67vh', width:350, margin:'20px auto' ,border: '2px solid yellowgreen'}
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
      <div>
        <Grid  >
          <Paper elevation={10} style={paperStyle}>
          <Grid style={{padding:'20 auto'}} align='center'>
           <Avatar style={avatarStyle}>
              <LocalHospitalIcon/>
            </Avatar>
            <h3>Sign in</h3>
          </Grid  >

          <TextField onChange={(e)=>{setUsername(e.target.value)}} label="Username" variant="standard" placeholder="Enter your username" fullWidth required/>        
          <TextField onChange={(e)=>{setPassword(e.target.value)}} type='password' label="Password" variant="standard" placeholder="Enter yout password" fullWidth required/>
          
          <FormControlLabel control={<Checkbox name="checkedB"  color=""/>} label="Remember Me"/>
          <Button onClick={SignIn}  style={btnStyle} fullWidth variant="contained">Sign In</Button>
            <Typography>
              <Link  style={{margin :"-8px" }}   href="#">
              Forgot Password
              </Link>
            </Typography>
            <Typography  style={{margin :"-8px" }}> Do you have an account ? 
              <Link href="signup">
              Sign Up
              </Link>
           </Typography>

          </Paper>
        </Grid>
        <h1> Status : {LoginStatus} </h1>
      </div>
  )
}

export default withRouter(Login);
