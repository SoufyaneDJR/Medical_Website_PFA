import React, { useState } from 'react'
import './Form.css'
import axios from 'axios'

const SearchForm = ({ onSearch }) => {
  axios.defaults.withCredentials = true
  const [form, setForm] = useState({
    drugname: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();
    let data = { form }
    console.log(data)
    axios.defaults.withCredentials = true
    onSearch(form);
    setForm({
      drugname: '',
    });
  }

  return (
    <>
      <div className="searchform" >
        <h1>Search For a Drug</h1>
        <form className='searchcontainer' autocomplete="off" onSubmit={onSubmit}>
          <input className='searchdrugname' type="text" autocomplete="off" id='drugname'  placeholder='Drug Name' value={form.drugname} onChange={(e) => setForm({ ...form, drugname: e.target.value })}></input>
          <input className='searchbutton' type="submit" value="Search for a drug"></input>
        </form>
      </div>
    </>
  )
}

export default SearchForm
