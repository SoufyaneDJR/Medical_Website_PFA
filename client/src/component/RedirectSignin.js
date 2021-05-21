import React from 'react'
import {Redirect, Route} from 'react-router-dom';


function RedirectSignin({loggedIn,component :Component,...rest}) {
  return (
    <Route {...rest } render={(props)=>{
      if ( loggedIn){
        return <Component/>
      }else{
        alert("You Have To Sign In First")
        return (
          <Redirect  to ={{pathname:"/signin" , state:{from: props.location}}}/>
        ) 
      }
    }}  />
  )
}

export default RedirectSignin
