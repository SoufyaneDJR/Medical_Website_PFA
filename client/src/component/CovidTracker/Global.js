import React , {Component} from 'react'
import "./Global.css"
import axios from"axios"
import NumberFormat from "react-number-format"
import WorldStats from './WorldStats';
import * as RiIcons from "react-icons/ri"
import * as GrIcons from "react-icons/gr"

export default class Global extends Component {

  state = {
    result:{
      "TotalConfirmed": 0,
      "TotalDeaths":0,
      "TotalRecovered":0,
      "ActiveCase":0
    }
  }
  async componentDidMount()  {
    const globalData = await axios("https://api.covid19api.com/summary");
    let corona = globalData.data.Global
    this.setState({
      result : {
        "TotalConfirmed": corona.TotalConfirmed,
        "TotalDeaths":corona.TotalDeaths,
        "TotalRecovered":corona.TotalRecovered,
        "ActiveCase":corona.TotalConfirmed - (corona.TotalDeaths+corona.TotalRecovered)
      }
      }
    )}
  
  render(){

    var Stats = Object.keys(this.state.result).map((key, index)=>{

      return <WorldStats
       key={index}
       about={key} 
       total={<NumberFormat value={this.state.result[key]} thousandSeparator={true} displayType="text" style={{fontSize:30}} />}/>
    })

  return (
    <div className="Global">
      <h1 className="heading"><GrIcons.GrStatusWarning/> C<RiIcons.RiVirusFill style={{fontSize:30}} />vid-19 <GrIcons.GrStatusWarning/></h1>
      <p className="description">Let's check informations About Covid-19</p>

      <div className="world-stats">
        {Stats}
      </div>
      
    </div>
  )
}

}
