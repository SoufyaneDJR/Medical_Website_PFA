import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import { Grid, Paper, TextField } from '@material-ui/core'
import * as FcIcons from "react-icons/fc"


function CaloriCalculator() {

 const [resultMale, setresultMale] = useState(0)
 const [resultFemale, setresultFemale] = useState(0)
 const [idealtMale, setidealtMale] = useState(0)
 const [idealFemale, setidealFemale] = useState(0)
 const [BmrMale, setBmrtMale] = useState(0)
 const [BmrFemale, setBmrFemale] = useState(0)
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

 const Age1 = () =>{
  setAge(0)
 }
 const Weight1 = () =>{
  setWeight(0)
 }
 const Height1 = () =>{
  setHeight(0)
 }
 


  const stylePaper = {height:'60vh' , width:'600px',margin:"8px auto", marginTop:"50px" ,padding:'10px' , border:"1px solid black" , paddingTop:20}
  const styleOption = {marginLeft:5  ,width: 650 , height:40 , marginTop:20}
  const listStyle = {marginLeft:15}
  const btnStyle = { backgroundColor:"yellowgreen" ,color:"white", margin:"8px 0px", marginTop:10 }
  const styleRadio = { display: 'inline-block',marginTop:'10px'}

  return (
    <div style={{backgroundImage: 'url(flou.png)', paddingBottom:20 }} >
      
        <h1 style={{padding:40, color:'white'}}> <FcIcons.FcCalculator /> CALCULATOR</h1>
        <h3 style={{textAlign: 'center',color:'white'}}>The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day. This calculator can also provide some simple guidelines for gaining or losing weight.</h3>

        <Grid >
           <Paper style={stylePaper }>
             
           <div className="textField" >  
            <TextField type="number" label="age" variant="outlined" placeholder="Enter your age"  onChange={Age} fullWidth required/>  
           </div>
             <div className="textField" >   
            <TextField style={{margin: 'auto'}}  type='text' label="Weight" variant="outlined" placeholder="Enter yout weigth" onChange={Weight} fullWidth required/>
            </div>
            <div className="textField" >
            <TextField type="text" label="Height" variant="outlined" placeholder="Enter your height" onChange={Height} fullWidth required/>   
            </div>
           
            
            <Button style={btnStyle} onClick={()=>{
              setresultMale(10*parseInt(height)+6.25*parseInt(weight)-5*parseInt(age)+5);
              setresultFemale(10*parseInt(height)+6.25*parseInt(weight)-5*parseInt(age)+161);
              setidealtMale(parseInt(height)- 100 - ((parseInt(height) - 150) /4 ));
              setidealFemale(parseInt(height)- 100 - ((parseInt(height) - 150) /2.5 ));
              setBmrtMale();
              setBmrFemale()
              }} fullWidth variant="outlined">CALCULATE</Button>
            <Button style={btnStyle} onClick={()=>{setresultFemale("0");setresultMale("0")}} fullWidth variant="outlined">CLEAR</Button>
            
           </Paper>
           <div style={{color:'white'}}>
          <h2>BMR Calculator </h2>
          <p style={{color:'white', marginLeft:60, fontSize:20}}>Male : {resultMale}</p>
          <p style={{color:'white', marginLeft:60, fontSize:20}}>Female : {resultFemale} </p>
          <h2>Ideal weight CALCULATOR </h2>
          <p style={{color:'white', marginLeft:60, fontSize:20}}>Male : {idealtMale} Kg</p>
          <p style={{color:'white', marginLeft:60, fontSize:20}}>Female : {idealFemale} Kg</p>
          
          </div>
           
        </Grid>
    </div>
  )
}

export default CaloriCalculator
