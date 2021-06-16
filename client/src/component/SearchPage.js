import '../App.css';
import SearchForm from './SearchForm';
import SearchList from './SearchList';
import {useState} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router'


function SearchPage() {
  console.log(localStorage.getItem('status'))
  axios.defaults.withCredentials = true
  const [tracker, setTracker] = useState({});

  //Search a drug: 
  const searchDrug = (drug) => {
    axios.get(`http://localhost:3002/medicament/query=${drug.drugname}`).then(
      (res) => {
        res.data = JSON.parse(JSON.stringify(res.data))
        console.log(res.data)
        setTracker([...res.data])
      }
    )
  }

  console.log(tracker)
  return (
    <div className="searchPage">

      <SearchForm onSearch={searchDrug} />
      {
        tracker.length > 0 ? (
          <SearchList trackedDrugs={tracker} />
        ) : (
          <div className='list-empty'>
            No Drugs Found
          </div>
        )
      }
    </div>
  );
}

export default withRouter(SearchPage)
