import React from 'react'
import {Redirect, Route} from 'react-router-dom';

function RedirectHome({loggedIn,component :Component,...rest}) {
  return (
      
    <Route {...rest } render={(props)=>{
      if (!loggedIn){
        return <Component/>
      }else{
        return (
          <Redirect  to ={{pathname:"/" , state:{from: props.location}}}/>
        ) 
      }
    }}  />
  
    
  )
}

export default RedirectHome
