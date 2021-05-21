import React  from 'react'
import Button from '@material-ui/core/Button';
import "./home.css"
import Modal from 'react-modal';


Modal.setAppElement('#root');

function Homie() {

  return (
      
   <>
     <section className="home">
     <div class="row1">
         
                <div className="course-col1">
                 <img className="img" src="covid1.png"/>
                 <h1>COVID-19</h1>
                 <p style={{marginLeft :"70px" , marginRight:"70px"}}>Dude,Stay at Home, Stay Safe <Button href="/covid" style={{marginRight:0, marginTop:20  , marginBottom:-40 , size:"small" ,color:"yellowgreen"}}  variant="outlined">go to ..</Button></p>
                 </div>
                <div className="course-col1">
                 <img  className="img" src="doctor.png"/>
                 <h1>HEALTH</h1>
                 <p style={{marginLeft :"70px" , marginRight:"70px"}}>You gotta nourish to flourish <Button href="health" style={{color:"yellowgreen", marginTop:20  , marginBottom:-40 , size:"small"}} variant="outlined">go to ..</Button></p>
                 </div>
                <div className="course-col1">
                 <img className="img" src="covid2.png"/>
                 <h1> FITNESS</h1>
                 <p style={{marginLeft :"70px" , marginRight:"70px"}}>It is the right path to living well <Button href="fitness" style={{ color:"yellowgreen", marginTop:20 , marginBottom:-40 }} variant="outlined">go to ..</Button></p>
                 </div>
         
     </div>
  
     </section>
    </>
  )
}

export default Homie
