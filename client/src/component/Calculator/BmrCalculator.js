import React from 'react'
import Button from '@material-ui/core/Button';
import { Grid, Paper, TextField } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as FcIcons from "react-icons/fc"

function BmrCalculator() {

  const styleRadio = { display: 'inline-block',marginTop:'10px'}
  const btnStyle = { backgroundColor:"yellowgreen" ,color:"white", margin:"8px 0px", marginTop:10 }
  const stylePaper = {height:'74vh' , width:'700px',margin:"8px auto", marginTop:"50px" ,padding:'20px' , border:"2px solid yellowgreen" , marginBottom : 40}

  return (
    <div style={{backgroundImage: 'url(flou.png)' , marginBottom:-40, paddingBottom:15}}>
        <h1 style={{padding:40 , color:'white'}}><FcIcons.FcCalculator /> BMR CALCULATOR</h1>
        <h3 style={{color:'white'}}>You use energy no matter what you're doing, even when sleeping. The BMR Calculator will calculate your Basal Metabolic Rate (BMR); the number of calories you'd burn if you stayed in bed all day.</h3>

        <Grid>
           <Paper style={stylePaper} >
           <div className="textField" > 
            <TextField type="number" label="age" variant="outlined" placeholder="Enter your age" fullWidth required/>    
            </div>
            <FormControl style={styleRadio} component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />     
                </RadioGroup>
                </FormControl>     
             <div className="textField" >   
            <TextField style={{margin: 'auto'}}  type='text' label="height" variant="outlined" placeholder="enter your height" fullWidth required/>
            </div>
            <div className="textField" >   
            <TextField style={{margin: 'auto'}}  type='text' label="Weight" variant="outlined" placeholder="enter your weigth" fullWidth required/>
            </div>
            <Button style={btnStyle}  variant="outlined" fullWidth>CALCULATE</Button>   
            <Button style={btnStyle} fullWidth variant="outlined">CLEAR</Button>
           </Paper>
        </Grid>
    </div>
  )
}

export default BmrCalculator
