import './App.css';
import Form from './components/Form';
import List from './components/List';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true

  const [tracker, setTracker] = useState({});
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
        res.data = JSON.parse(JSON.stringify(res.data))
        console.log(res.data)
        setTracker([...res.data])
      }
    )
  }, [])


  //Delete an element : 
  const deleteDrug = (id) => {
    console.log(id)
    setTracker(tracker.filter((drug) => drug.id !== id))
    axios.post('http://localhost:3002/tracker/delete', {
      id: id,
    }).then((response) => {
      console.log(response)
      if (response.data) {
        alert(response.data)
      }
    })


  }

  //toogle reminder :
  const reminder = (id) => {
    console.log(tracker)
    setTracker(tracker.map((drug) => drug.id === id ? { ...drug, reminder: !drug.reminder } : drug))
    let obj = tracker.filter((drug) => { return drug.id === id })[0]
    const rem = (obj.reminder) ? "0" : "1";

    axios.post('http://localhost:3002/tracker/reminder',{
      username:obj.username,
      drugname:obj.drugname,
      firstday:obj.firstday,
      lastday:obj.lastday,
      frequency:obj.frequency,
      note:obj.note,
      reminder: rem,
    } ).then((response) => {
      console.log(response)
      if (response.data) {
        alert(response.data)
      }
    })

  }

  //Add drug into tracker : 

  const addDrug = (drug) => {

    const id = 10000 + Math.floor(Math.random() * 1000);
    const username = 'default'

    drug.firstday = new Date(drug.firstday).toDateString();
    drug.lastday = new Date(drug.lastday).toDateString();
    let newDrug = { id, username, ...drug };
    newDrug = JSON.parse(JSON.stringify(newDrug));
    setTracker([...tracker, newDrug])
  }


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
