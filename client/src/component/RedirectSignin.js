import {Redirect, Route} from 'react-router-dom'


function RedirectSignin({status,component :Component,...rest}) {
  let log = localStorage.getItem('loggedIn')
  log = (log == 'true') ? true: false;
  return (
    <Route {...rest } render={(props)=>{
      if (log){
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
