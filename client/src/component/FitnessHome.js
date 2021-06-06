import React,{useState, useEffect} from 'react'
import "../component/FitnessHome.css"
import * as IoIcons from "react-icons/io"
import axios from 'axios'
import fitness from "../pages/fitness.json"

function FitnessHome() {

  const spanStyle = {fontWeight:'bold', fontSize:15 , color : 'yellowgreen' , marginLeft: 0 , display : 'grid' ,gridTemplateColumns : 'auto auto auto auto'}
  const [searchTerm, setsearchTerm] = useState('')
   
  return (

    <div>
      
     <section className="fitnessHome">
     <div className="FitnessContainer">
      <h1 >IT'S<strong > GYM </strong>TIME  LET'S GO <IoIcons.IoIosFitness/></h1>
      <h2 >  WE ARE READY <strong style={{color:"yellowgreen"}}> TO FIT YOU </strong></h2>
     </div>
      </section>

      <section>
        < input className="input" placeholder=".. Exercices"  onChange={(event) =>{setsearchTerm(event.target.value)}}/>
        
      </section>

      <div className="grid" style={{margin: "auto 60px" , gridTemplateColumns:"auto auto auto"}}>
       
            {fitness.filter((val)=>{
                if(searchTerm == ""){
                    return val
                }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
            }).map((val,key)=>{
                return(
                  
                    <div className="user" key={key}>
                       <article style={{width:'300px',padding:10}} >
                         <h3 style={{padding:10}}><strong style={{fontSize:20 }}>{val.name}..</strong> </h3>
                         <div style={{padding:10}}><img style={{width:"100%"}} src={val.image} /></div>
                         <div style={{padding:10}}><span style={{color:"red"}}>Aim:</span> {val.aim}..</div>
                         <div style={{padding:10}}><span style={{color:"red"}}>Technique</span> {val.technique}..</div>
                         
                       </article>
                    </div>
                    
                )
            })}
            
      
    </div>
    </div>
  )
}

export default FitnessHome
