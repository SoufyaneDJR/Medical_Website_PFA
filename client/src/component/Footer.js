import React from 'react'
import "./footer.css" ;
import * as FaIcons from "react-icons/fa"
import * as BiIcons from "react-icons/bi"
import * as SiIcons from "react-icons/si"
import * as RiIcons from "react-icons/ri"
import * as GiIcons from "react-icons/gi"

import * as ImIcons from "react-icons/im"




function Footer() {

  return (
    <>
    <div className="footer">
      <div className="container">
          <img className="footer-img" src="health1.png"/>
      </div>
      <div className="footer-row">
        <ul className="col1">
          <li><FaIcons.FaLocationArrow /> Oujda ,Morocco</li>
          <li><BiIcons.BiPhoneCall/> +212 6 89 44 48 67</li>
          <li><SiIcons.SiGmail/>  ouiamhich@gmail.com</li>
        </ul>

        <ul className="col2">
        <h2 className="footer-title">Contact Us</h2>
          <li ><a className="a" href="https://www.facebook.com/ouiam.hichour/"><FaIcons.FaFacebookF/> Facebook</a></li>
          <li><a className="a"  href="https://www.instagram.com/ouiam.hichour/"> <SiIcons.SiInstagram/> instagram </a></li>
          <li><a className="a" href="https://www.linkedin.com/in/ouiam-hichour-0813591b3/"> <ImIcons.ImLinkedin2/> </a>Linkedin</li>
          <li><FaIcons.FaGithub/> Git Hub</li>
        </ul>

        <ul className="col2">
        <h2 className="footer-title">Explore</h2>
          <li><FaIcons.FaBriefcaseMedical/> Services</li>
          <li><GiIcons.GiHealthPotion/> Health</li>
          <li><FaIcons.FaFileMedicalAlt/> fitness</li>
          <li><RiIcons.RiVirusFill/> Covid-19 </li>
        </ul>


      </div>
       

    </div>
   
      
    
    </>
  )
}

export default Footer
