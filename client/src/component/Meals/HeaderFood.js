import React from 'react'
import "./HeaderFood.css"
import * as GiIcons from "react-icons/gi"

export default function HeaderFood() {
  return (
    <div className="header-food">
      <div className="header-title">
      <h1><GiIcons.GiFruitBowl/>Choose Your Appropriate Food<GiIcons.GiFruitBowl/></h1>
      <p className="par">Does that extra pound trouble you? Don't worry! A food calorie list has been devised for you to check what you eat and lose that<br/> extra calorie to look slim and beautiful , just enter the number of te Calories that you need</p>
      </div>
    </div>
  )
}
