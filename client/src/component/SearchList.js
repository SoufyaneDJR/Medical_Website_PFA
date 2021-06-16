// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react'
import SearchedElement from './SearchedElement'
import './List.css'
import { BrowserRouter as Router } from 'react-router-dom';

const SearchList = ({ trackedDrugs }) => {
    console.log(trackedDrugs)
  return (
    <>
      <div>
        <table className="List">
          <thead>
            <tr>
              <th>Drug Name</th>
            </tr>
          </thead>
          <tbody>
            <Router>
              {trackedDrugs.map((row) => (
                <SearchedElement key={row.d_id} tracked={row}></SearchedElement>
              ))}
            </Router>
          </tbody>
        </table>

      </div>
    </>
  )
}

export default SearchList
