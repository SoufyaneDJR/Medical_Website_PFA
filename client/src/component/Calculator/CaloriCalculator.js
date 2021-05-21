import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import { Grid, Paper, TextField } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as GrIcons from "react-icons/gr"


function CaloriCalculator() {

 const [height, setHeight] = useState("")
 const [weight, setWeight] = useState("")
 const [bonus, setBonus] = useState("")
 const [age, setAge] = useState(0)
 const [gender, setGender] = useState(false)
 const [cal, setCal] = useState("")

 function setHeightOn (e){
    setHeight(e.target.value)
 }
 function setWeightOn (e){
     setWeight(e.target.value)
}
function setHAgeOn (e){

}
function setGenderOn (e){
    
}
function setBonusOn (e){
    
}


  const stylePaper = {height:'82vh' , width:'700px',margin:"8px auto", marginTop:"50px" ,padding:'20px' , border:"2px solid yellowgreen"}
  const styleOption = {marginLeft:5  ,width: 650 , height:40 , marginTop:20}
  const listStyle = {marginLeft:15}
  const btnStyle = { backgroundColor:"yellowgreen" ,color:"white", margin:"8px 0px", marginTop:10 }
  const styleRadio = { display: 'inline-block',marginTop:'10px'}

  return (
    <div >
      
        <h1 style={{padding:40}}> <GrIcons.GrCalculator/> CALORIES CALCULATOR</h1>
        <h3 style={{textAlign: 'center'}}>The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day. This calculator can also provide some simple guidelines for gaining or losing weight.</h3>

        <Grid>
           <Paper style={stylePaper}>
            <TextField type="number" label="age" variant="outlined" placeholder="Enter your age" fullWidth required/>  
            <FormControl style={styleRadio} component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                </FormControl> 
             <div className="textField" >   
            <TextField style={{margin: 'auto'}}  type='text' label="Weight" variant="outlined" placeholder="Enter yout weigth" fullWidth required/>
            </div>
            <div className="textField" >
            <TextField type="text" label="Height" variant="outlined" placeholder="Enter your height" fullWidth required/>   
            </div>
            
            <Button style={btnStyle} fullWidth variant="outlined">CALCULATE</Button>
            <Button style={btnStyle} fullWidth variant="outlined">CLEAR</Button>
            <h1>Result : </h1>
           </Paper>
           
        </Grid>
    </div>
  )
}

export default CaloriCalculator
