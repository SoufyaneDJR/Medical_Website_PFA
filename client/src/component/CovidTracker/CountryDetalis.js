import React from 'react'
import "./CountryDetails.css"
import ReactCountryFlag from "react-country-flag"

function CountryDetalis(props) {

  return (
    <div className="country-details">
      <div className="country-icons">
       
        <ReactCountryFlag
           className="country-flag"
          countryCode={props.countryCode}
          svg
          style={{
            width : "3.5em",
            height: "13 em",
            paddingTop : "10px"
          }}
          title = {props.countryCode}
          
        />

      </div>

      <div className="cases-detail">

        <div className="cases-box Cases">
          <a href="#">{props.totalCases}</a>
          <p className="yesterday">Last 24 Hours : <strong>{props.newCases}</strong></p>
        </div>

        <div className="cases-box-deaths">
          <a href="#">{props.totalDeaths}</a>
          <p className="yesterday">Last 24 Hours : <strong>{props.newDeaths}</strong></p>
        </div>

        <div className="cases-box-recovered">
          <a href="#">{props.totalRecovered}</a>
          <p className="yesterday">Last 24 Hours : <strong>{props.newRecovered}</strong></p>
        </div>

      </div>

    

    </div>
    
  )
}

export default CountryDetalis
