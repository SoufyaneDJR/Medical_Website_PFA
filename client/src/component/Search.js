import React,{useState} from 'react'
import JasonDataA from '../pages/A.json'
import * as GoIcons from "react-icons/go"

function Search() {

  const spanStyle = {fontWeight:'bold', fontSize:15 , color : 'yellowgreen' , marginLeft: 0 , display : 'grid' ,gridTemplateColumns : 'auto auto auto auto'}

  const [searchTerm, setsearchTerm] = useState('')
  
  return (
    <div >
      <div className="header">
       <h2  style={{textAlign: 'center' }}> <GoIcons.GoSearch/> Search For Your MEDICAMENT</h2>
       <input style={{padding:25 ,marginLeft:430,marginTop: 20 , marginBottom: 20,  display: 'flex' , justifyContent:'center' , alignItems:'center'}} type="text" placeholder="Search .." onChange={(event) =>{setsearchTerm(event.target.value)}}  />
       </div>  
            <div className="grid">  
            {JasonDataA.filter((val)=>{
                if(searchTerm == ""){
                    return val
                }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
            }).map((val,key)=>{
                return(
                  
                    <div className="user" key={key}>
                       <p >
                         <div><span style={spanStyle} >NOM:</span> {val.name}.. </div>
                         <div><span style={spanStyle}>PRESENTATION :</span> {val.presentation}..</div>
                         <div><span style={spanStyle}>PRIX HOSPITALIER :</span>{val.prixHos}..</div>
                         <div><span style={spanStyle}>COMPOSITION:</span> {val.composition}..</div>
                         <div><span style={spanStyle}>FAMILLE :</span> {val.famille}..</div>
                         <div><span style={spanStyle}>PPV :</span> {val.ppv}..</div>
                         <div><span style={spanStyle} >indication :</span>  {val.indication}</div>
                       </p>
                    </div>
                    
                )
            })}
            </div>
    </div>
  )
}

export default Search
