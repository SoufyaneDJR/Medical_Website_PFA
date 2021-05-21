import React ,{useState}from 'react'
import './profil.css'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import { Button } from '@material-ui/core';


function Proffil() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState("")

  const submit = () =>{
    axios.post("http://localhost:3002/profil",{
      firstName : firstName,
      lastName : lastName,
      weight: weight,
      height : height,
      age: age,
      gender : gender,
    }).then((response)=>{
      console.log(response);
    })
  }

  return (

    <div>
      <form>
      <Avatar className="avatar"/>
      <div className='input-profil'>
      
      <input onChange={e=>{setFirstName(e.target.value)}} className='input' type="text" name="fname" placeholder="enter your Fist Name"/>
      <input  onChange={e=>{setLastName(e.target.value)}}className='input'type="text" name="sname"placeholder="enter your Second Name"/>
      <input onChange={e=>{setWeight(e.target.value)}} className='input'type="text" name="weight"placeholder="enter your weight"/>
      <input onChange={e=>{setHeight(e.target.value)}} className='input'type="text" name="height"placeholder="enter your height"/>
      <input onChange={e=>{setAge(e.target.value)}} className='input' type="number" name="age" placeholder="enter your age"/>
      <input onChange={e=>{setGender(e.target.value)}} className='input' type="text" name="gender" placeholder="enter your gender"/>
     <div style={{display:'flex', justifyContent:'center' , alignItems:'center' , marginBottom: 20}}><Button  variant="contained" color="default"> add Informations</Button></div> 
      </div>
      </form>
    </div>
  )
}

export default Proffil
