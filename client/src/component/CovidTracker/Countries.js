import React, { Component } from 'react';
import "./Countries.css"
import "./CountryDetails.css"
import ArraySort from  "array-sort"
import axios from "axios"
import HeadingNames from './HeadingNames'
import CountryDetalis from './CountryDetalis'
import NumberFormat from "react-number-format"
import * as ImIcons from "react-icons/im"

export default class Countries extends Component {

 state = {
    countryDetails:[],
    searchedCountries:[]
 }
 async componentDidMount() {
  var data1 = await axios.get("https://api.covid19api.com/summary")
  var countryDetails = data1.data.Countries
  countryDetails = ArraySort(countryDetails,"TotalConfirmed", {reverse: true})
  this.setState({countryDetails : countryDetails , status : true , selectedData : countryDetails})
  
}

  ChangeSortValue = e =>{
    const value = e.target.value
    let sortByReverse = true

    if (value == 'Lowest'){
      sortByReverse = false
    }else{
      sortByReverse = true
    }
    
    let countryDetails = ArraySort(this.state.countryDetails,'TotalConfirmed', {reverse: sortByReverse})
 
    this.setState({countryDetails : countryDetails})
  }
  

  searchCountry = e => {
    const value = e.target.value
    var countryDetails = this.state.countryDetails
    var FindCountry = []
    
    if (value) {
      countryDetails.map((cur, index) =>{
        const finder = cur.Country.toLowerCase().search(value.toLowerCase())
        if (finder !== -1){
          FindCountry.push(countryDetails[index])
        }

      })
      FindCountry = ArraySort(FindCountry, 'TotalConfirmed' , {reverse: true})
      this.setState({searchedCountries : FindCountry})
    }else{
      this.setState({countryDetails : countryDetails})
    }
    if(value.length === 0){
      this.setState({selectedData : this.state.countryDetails})
    }else{
      this.setState({selectedData : this.state.searchedCountries})
    }
  }




  render() {

    const changeNumberToFormat = (val)=> {
     return <NumberFormat value={val} thousandSeparator={true} displayType="text"/>
    }

    var countriesList = this.state.countryDetails.length>0 ?
    this.state.selectedData.map((function(curr, index){
      return  <CountryDetalis
              key = {index}
                  countryCode = {curr.CountryCode}
                  totalCases = {changeNumberToFormat(curr.TotalConfirmed)}
                  newCases={changeNumberToFormat(curr.NewConfirmed)}
                  totalDeaths = {changeNumberToFormat(curr.TotalDeaths)}
                  newDeaths={changeNumberToFormat(curr.NewDeaths)}
                  totalRecovered = {changeNumberToFormat(curr.TotalRecovered)}
                  newRecovered={changeNumberToFormat(curr.NewRecovered)}/>
  
    })):null
    return (
      
      <div className="countries-stats">
        <h2 className="countries-stats-heading"> <ImIcons.ImStatsDots/> Countries Stats</h2>
        <div className="filtering">
          <input type="text" placeholder="Enter the Country" onChange={this.searchCountry}/>
          <select className="sort-by" onChange = {this.ChangeSortValue} >
            <option>Highest</option>
            <option>Lowest</option>
          </select>
        </div>

        <HeadingNames/>
        {countriesList}

      </div>
    );
  }
}
