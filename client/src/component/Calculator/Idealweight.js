
import React,{useState} from 'react'
import * as GrIcons from "react-icons/gr"
import Button from '@material-ui/core/Button';
import { Grid, Paper, TextField } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



function Idealweight() {


  
  const styleRadio = { display: 'inline-block',marginTop:'10px'}
  const btnStyle = { backgroundColor:"gray" ,color:"white", margin:"8px 0px", marginTop:10 }
  const stylePaper = {height:'70vh' , width:'700px',margin:"8px auto", marginTop:"50px" ,padding:'20px' , border:"2px solid gray"}


  return (
    <div>
       <h1 style={{padding:40}}> <GrIcons.GrCalculator/> IDEAL WEIGHT CALCULATOR</h1>
        <h3>What’s my ideal weight?” It’s a pretty normal question for most men and women. Knowing your ideal weight can help you make healthy choices for fitness, nutrition and lifestyle. Use this ideal weight calculator to find out the ideal weight</h3>

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
            <Button style={btnStyle}  variant="outlined" fullWidth>CALCULATE</Button>  
            <Button style={btnStyle} fullWidth variant="outlined">CLEAR</Button> 
           </Paper>
        </Grid>
    </div>
  )
}

export default Idealweight
