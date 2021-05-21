import axios from 'axios'
import { Redirect, withRouter } from 'react-router'
import Home from '../../pages/Home'


function logout() {

  const LogOut=()=>{
  axios.post("http://localhost:3002/logout").then(()=>{ 

      window.location.reload()

    }
  )}
 LogOut()
 return <Redirect to="/" />
}
export default withRouter (logout)
