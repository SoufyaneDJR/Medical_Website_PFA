import React , {Component} from 'react'
import Countries from '../component/CovidTracker/Countries'
import Global from '../component/CovidTracker/Global'


function Covid() {
  return (
    <div className="covid">
    <Global/>
    <Countries/>
  </div>
  )
}

export default Covid

