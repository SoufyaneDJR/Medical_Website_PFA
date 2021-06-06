import Reac from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import * as RiIcons from "react-icons/ri"
import * as IoIcons from "react-icons/io"







export const Sidebar = [

  
  {
    title:'Home',
    path :'/',
    icon: <AiIcons.AiFillHome/>,
    cName:'nav-text'
  },
  {
    title:'Profile',
    path :'/profil',
    icon: <FaIcons.FaBriefcaseMedical/>,
    cName:'nav-text'
  },
  {
    title:'Services',
    path :'/services',
    icon: <FaIcons.FaBriefcaseMedical/>,
    cName:'nav-text'
  },

  {
    title:'Covid-Tracker',
    path :'/covid',
    icon: <RiIcons.RiVirusFill/>,
    cName:'nav-text'
  },
  {
    title:'Health',
    path :'/Health',
    icon: <RiIcons.RiMentalHealthFill/>,
    cName:'nav-text'
  },
  {
    title:'Fitness',
    path :'/Fitness',
    icon: <IoIcons.IoIosFitness/>,
    cName:'nav-text'
  },
  
  {
    title:'Sign up',
    path :'/signup',
    icon: <BiIcons.BiLogIn/>,
    cName:'nav-text'
  },
 
]
  

