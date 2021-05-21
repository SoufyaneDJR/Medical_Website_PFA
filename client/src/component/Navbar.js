import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Sidebar } from "./Sidebar"
import "./Navbar.css"
import { IconContext } from 'react-icons';
import Button from '@material-ui/core/Button';
import * as FiIcons from "react-icons/fi";
import Modal from 'react-modal';
import axios from 'axios'



Modal.setAppElement('#root');


function Navbar() {

  const [LoginStatus, setLoginStatus] = useState(false)


  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get("http://localhost:3002/login").then((response) => {
      console.log(response.data);
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        Sidebar.pop()
      }else{
        setLoginStatus(false)
      }
    });
  }, []);

  const [sidebar,setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar);


  const btnLoginStyle = {borderColor:"yellowgreen" , color:'yellowgreen', marginLeft:0,backgroundColor:'black'}
  

  return (
    <>
   
    <IconContext.Provider value={{ color: 'white' }}>
      <div className="navbar">
       
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} onRequestClose={showSidebar}/>
        </Link>

       <img src="health1.png" className="logo"/>
      

       <Button 
          
          startIcon={<FiIcons.FiLogIn color="yellowgreen" />} 
          style={btnLoginStyle}
          className="login"           
          variant="contained"
          size="small"
          href={LoginStatus ? "signout" : "signin"} >
          {LoginStatus ? "sign Out" : "sign In"}
       </Button>
       

      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="nav-bar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose/>
              </Link>
          </li>
          {Sidebar.map((item,index)=>{
            return (
              <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar

