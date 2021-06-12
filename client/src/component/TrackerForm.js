import React, { useState} from 'react'
import './Form.css'
import axios from 'axios'

const TrackerForm = ({ onAdd,status }) => {
  axios.defaults.withCredentials = true
  const [form, setForm] = useState({
    drugname: '',
    firstday: '',
    lastday: '',
    frequency: '',
    note: '',
    reminder: false
  })

  const onSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (!form[key] && key !== 'note' && key !== 'reminder') {
        alert(`Please Insert ${key}`)
        return
      }
    }
    
    const id = 10000 + Math.floor(Math.random() * 1000);
    const username = status.user[0].username
    let data = { id, username, ...form }
    console.log(data)
    // console.log(data)
    // data = [...parsedData,data]
    // data =JSON.stringify(data)
    // console.log(data)


    axios.defaults.withCredentials = true
    axios.post(`http://localhost:3002/tracker/insert/${status.user[0].username}`,{
      drugname: form.drugname,
      firstday: form.firstday,
      lastday: form.lastday,
      frequency: form.frequency,
      note: form.note,
      reminder:form.reminder,
    }).then((response) => {
      console.log(response)
      if (response.data) {
        alert(response.data)
      }
    })

    onAdd(form);

    setForm({
      drugname: '',
      firstday: '',
      lastday: '',
      frequency: '',
      note: '',
      reminder: false
    });
  }
  return (
      <div className="trackerform" >
        <h1>Insert Drugs you want to track</h1>
        <form className='listcontainer' onSubmit={onSubmit}>
          <input className='drugname' type="text" id='drugname' placeholder='Drug Name' value={form.drugname} onChange={(e) => setForm({ ...form, drugname: e.target.value })}></input>

          <label className='firstday' >
            <input type="date" id='firstday' value={form.firstday} onChange={(e) => setForm({ ...form, firstday: e.target.value })}></input>
          </label>
          <label className='lastday'>
            <input type="date" id='lastday' value={form.lastday} onChange={(e) => setForm({ ...form, lastday: e.target.value })}></input>
          </label>
          <label className='frequency'>
            <input type="time" id='frequency' value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })}></input>
          </label>
          <textarea className='note' type="text" id='note' placeholder='Add Your Notes' value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })}></textarea>
          <label className="reminder">
            Do you want to recieve a reminder :
          <input type="checkbox" id='reminder' placeholder='Add Your Notes' checked={form.reminder} value={form.reminder} onChange={(e) => setForm({ ...form, reminder: e.currentTarget.checked })}></input>
          </label>
          <input className='button' type="submit" value="Track Drug"></input>
        </form>
      </div>
  )
}

export default TrackerForm
