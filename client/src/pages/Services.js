import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as BsIcons from "react-icons/bs"
import * as GiIcons from "react-icons/gi"
import Button from '@material-ui/core/Button';
import Modal from 'react-modal'
import "./Services.css"
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function Services() {

  return (
    <>
      <div className="services">

        <section class="first">
          <h1><FaIcons.FaBriefcaseMedical /> Services</h1>

          <div class="row">
            <div class="course-col">
              <h3><BsIcons.BsAlarm /> REMINDER</h3>
              <p>this Website helps you to remember when you have to take your medicament, it reminds you by sending an e-mail to you , you just have to enter your informations</p>
              <Link to="/Tracker"> <Button variant="outlined"  >Get Started</Button> </Link>
            </div>
            <div class="course-col">
              <h3><GiIcons.GiMedicines /> MEDICAMENT</h3>
              <p>you can find here all data about any medicament you want(notice, price,extra informations ..), you just have to tap the name of this medicament</p>
              <Button href="/medicament" variant="outlined">Get Started</Button>
            </div>
            <div class="course-col">
              <h3><FaIcons.FaCalculator /> CALORIES</h3>
              <p>The calorie is a unit of energy defined as the amount of heat needed to raise the temperature of a quantity of water by one degree , Click to Start</p>
              <Button href='calculator' variant="outlined">Get Started</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default withRouter(Services)