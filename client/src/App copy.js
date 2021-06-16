
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {useState, useEffect} from 'react'
import Navbar from './component/Navbar';
import Home from './pages/Home'
import Services from './pages/Services'
import Health from './pages/Health'
import Fitness from './pages/Fitness'
import About from './pages/About.js';
import Signup from './component/LogInUp/Signup';
import Login from './component/LogInUp/Login';
import Covid from './pages/Covid';
import Calculator from './pages/Calculator';
import Search from './component/Search';
import Tracker from './component/Tracker';
import Profil from './pages/Profil';
import RedirectSignin from './component/RedirectSignin';
import axios from 'axios'
import RedirectHome from './component/RedirectHome';
import logout from './component/LogInUp/logout';


function App() {

  const [LoginStatus, setLoginStatus] = useState(false)
  const [status,setStatus]=useState({})

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get("http://localhost:3002/login").then((response) => {
      console.log(response.data);
      localStorage.setItem('loggedIn',response.data.loggedIn)
      if(response.data.user==undefined){
        localStorage.setItem('username',null)
      } else {
        localStorage.setItem('username',response.data.user[0].username)

      }

      if (response.data.loggedIn === true) {
        setStatus({...response.data})
        setLoginStatus(true);
      }else{
        setLoginStatus(false)
      }
    });
  }, []);
  return (
    <>
    <Router>
     <Navbar/>
     <Switch>

       <Route path='/' exact component={Home}/>
       <Route path='/Services' component={Services}/>
       <Route path='/Health' component={Health}/>
       <Route path='/Fitness' component={Fitness}/>
       <Route path='/About' component={About}/> 
       <Route path='/covid' component={Covid}/>      
       
       <Route path='/calculator' component={Calculator}/>
       <Route path='/search' component={Search}/>
       <Route path='/profil' component={Profil}/>
       <RedirectSignin path="/Tracker" exact component={Tracker} status={status}  />
       
       <RedirectHome path="/signin" exact component={Login} loggedIn={LoginStatus}  />
       <RedirectHome path="/signup" exact component={Signup} loggedIn={LoginStatus}  />
       <RedirectHome path="/signout" exact component={logout} loggedIn={LoginStatus}  />
     </Switch>
    </Router>
      
    </>
  )
}

export default App;
