import React from 'react'
import Trackedelement from './Trackedelement'
import './List.css'

const List = ({ trackedDrugs, onDelete, onToggle }) => {
  return (
    <>
      <div>
        <table className="List">
          <thead>
            <tr>
              <th>Drug Name</th>
              <th>First Day</th>
              <th>Last Day</th>
              <th>Frequency</th>
              <th>Notes</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trackedDrugs.map((row) => (
              <Trackedelement key={row.id} tracked={row} onDelete={onDelete} onToggle={onToggle}></Trackedelement>
            ))}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default List
