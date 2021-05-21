import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React from 'react'
import * as FaIcons from "react-icons/fa"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router';


function Reminder() {

  const stylePaper = {height:'75vh' , width:'700px',margin:"8px auto", marginTop:"50px" ,padding:'20px' , border:"2px solid gray"}
  const btnStyle = { backgroundColor:"gray" ,color:"white", margin:"8px 0px", marginTop:10 }

  return (
  
    <div>
      <h1><FaIcons.FaBriefcaseMedical/> Medication Reminder</h1>
          <h3>Medication Reminder helps you keep track of all of your pill and reminds you when it's time to refill prescription. Medication Reminder even tells you to take your pill before or after eating and reminds you the right dosage of medicine</h3>
      <Grid>
        <Paper style={stylePaper}>
        <div className="textField">
        <TextField type="text" label="Drug Name" variant="outlined" placeholder="enter your Drug name" fullWidth></TextField>
        </div>
        <div className="textField">
         FIRST TIME <TextField type="time"  variant="outlined" fullWidth></TextField>
        </div>

         <div className="textField">
         SECOND TIME<TextField type="time" variant="outlined" fullWidth></TextField>
        </div>
         <div className="textField">
         MONTH <TextField type="month"  variant="outlined" fullWidth></TextField>
          </div>
      <FormControlLabel control={ <Checkbox name="checkedB" color=""/> } label="Every Single Day "/>
      <FormControlLabel control={<Checkbox name="checkedB" color=""/> } label="Day by Day "/>
         <Button style={btnStyle}  variant="outlined" fullWidth>REMINDE ME</Button>

        </Paper>
      </Grid>
    </div>
  )
}

export default withRouter(Reminder)
