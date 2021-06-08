import './App.css';
import Form from './components/Form';
import List from './components/List';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tracker, setTracker] = useState([]);


  //Delete an element : 
  const deleteDrug = (id) => {
    setTracker(tracker.filter((drug) => drug.id !== id))
  }

  //toogle reminder :
  const reminder = (id) => {
    setTracker(tracker.map((drug) => drug.id === id ? { ...drug, reminder: !drug.reminder } : drug))
  }

  //Add drug into tracker : 
  const addDrug = (drug) => {
    const id = 10000 + Math.floor(Math.random() * 1000);
    const username = 'default'

    drug.firstday = new Date(drug.firstday).toDateString();
    drug.lastday = new Date(drug.lastday).toDateString();

    drug = { id, username, ...drug}
    console.log(tracker)
    setTracker({...tracker,drug})
    console.log()

    axios.post('http://localhost:3002/tracker/data/username/soufyane123',
      drug).then(
        (response) => {
          console.log(response)
          if (response.data) {
            alert(response.data)
          }
        }
      )
  }

  axios.defaults.withCredentials = true

  //Extract data from Server
  useEffect(() => {
    axios.get('http://localhost:3002/tracker/data/username/soufyane123').then(
      (res) => {
        res.data.forEach(
          (drug) => {
            drug.firstday = new Date(drug.firstday).toDateString();
            drug.lastday = new Date(drug.lastday).toDateString();

            const frequency = drug.frequency.split(":")
            drug.frequency = `${frequency[0]}:${frequency[1]}`

            drug.reminder = (drug.reminder === '0') ? false : true;
          }
        )
        setTracker(...tracker, res.data)
        // console.log(tracker)
        // for (let drug of res.data) {

        //   drug.firstday = new Date(drug.firstday).toDateString();
        //   drug.lastday = new Date(drug.lastday).toDateString();

        //   const frequency = drug.frequency.split(":")
        //   drug.frequency = `${frequency[0]}:${frequency[1]}`

        //   drug.reminder = (drug.reminder === '0') ? false : true ;

        //   console.log(drug)
        //   // setTracker([...tracker,drug])
        //   // break;
        //   // console.log(tracker);
        // }
      }
    )
  }, [])



  return (
    <>
      <Form onAdd={addDrug} />
      {
        tracker.length > 0 ? (
          <List trackedDrugs={tracker} onDelete={deleteDrug} onToggle={reminder} />
        ) : (
          <div className='list-empty'>
            No drugs Tracked
          </div>
        )
      }
    </>
  );
}

export default App;
