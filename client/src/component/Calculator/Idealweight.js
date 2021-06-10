
import React,{useState} from 'react'
import * as GrIcons from "react-icons/gr"
import Button from '@material-ui/core/Button';
import { Grid, Paper, TextField } from '@material-ui/core'




function Idealweight() {

  const [resultMale, setresultMale] = useState(0)
  const [resultFemale, setresultFemale] = useState(0)
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [age, setAge] = useState(0)

  const Age = (e) =>{
    setAge(e.target.value)
   }
   const Weight = (e) =>{
    setWeight(e.target.value)
   }
   const Height = (e) =>{
    setHeight(e.target.value)
   }
  
  
  const styleRadio = { display: 'inline-block',marginTop:'10px'}
  const btnStyle = { backgroundColor:"gray" ,color:"white", margin:"8px 0px", marginTop:10 }
  const stylePaper = {height:'70vh' , width:'700px',margin:"8px auto", marginTop:"50px" ,padding:'20px' , border:"2px solid gray"}


  return (
    <div  >
       <h1 style={{padding:40}}> <GrIcons.GrCalculator/> IDEAL WEIGHT CALCULATOR</h1>
        <h3>What’s my ideal weight?” It’s a pretty normal question for most men and women. Knowing your ideal weight can help you make healthy choices for fitness, nutrition and lifestyle. Use this ideal weight calculator to find out the ideal weight</h3>

        <Grid>
           <Paper style={stylePaper} >
           <div className="textField" > 
            <TextField onChange={Age} type="number" label="age" variant="outlined" placeholder="Enter your age" fullWidth required/>    
            </div>
                    
             <div className="textField" >   
            <TextField onChange={Height} style={{margin: 'auto'}}  type='text' label="height" variant="outlined" placeholder="enter your height" fullWidth required/>
            </div>
            <Button style={btnStyle}  onClick={()=>{setresultMale()}} variant="outlined" fullWidth>CALCULATE</Button>  
            <Button style={btnStyle} fullWidth variant="outlined">CLEAR</Button> 
           </Paper>
        </Grid>
    </div>
  )
}

export default Idealweight
