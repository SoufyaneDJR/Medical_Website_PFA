import {Redirect, Route} from 'react-router-dom'


function RedirectSignin({status,component :Component,...rest}) {
  return (
    <Route {...rest } render={(props)=>{
      if (status.loggedIn){
        return <Component status={status}/>
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
